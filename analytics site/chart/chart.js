const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

// ============================================
// GET FILE FROM SESSION STORAGE WITH ERROR HANDLING
// ============================================

let file = null;
let path = null;

try {
  const storedFile = window.sessionStorage.getItem("file");
  if (storedFile) {
    file = JSON.parse(storedFile);
    path = file ? file.path : null;
  }
} catch (error) {
  console.error('Error parsing sessionStorage:', error);
}


// If no file or no path, redirect to home
if (file == null || !path) {
  window.location.href = "../home/index.html";
}

let loadedData = null;
let isLoading = true;
let loadError = null;

async function loadFileFromPath(filePath) {
  console.log('Attempting to load file from:', filePath);
  
  try {
    const response = await fetch(filePath);
    
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    
    console.log('File loaded successfully. Records:', jsonData.length);
    return jsonData;
  } catch (error) {
    console.error('Error loading file:', error);
    throw error;
  }
}

loadFileFromPath(path)
  .then(data => {
    loadedData = data;
    isLoading = false;
    root.render(<App />);
  })
  .catch(error => {
    loadError = error.message;
    isLoading = false;
    root.render(<App />);
  });








function UniversityGraph(props) {
  // ALL hooks must be at the top, before any conditional returns
  const canvasRef = React.useRef(null);
  
  // State for checked categories
  const [checkedCategories, setCheckedCategories] = React.useState({
    'Full-time Undergrad': true,
    'Full-time Graduate': true,
    'Part-time Undergrad': true
  });
  
  // useEffect must be declared here, before conditional returns
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run if data is available
    if (!loadedData || loadedData.length === 0) return;

    const keys = Object.keys(loadedData[0]);
    
    // Helper function to get bilingual text
    const getBilingualText = (text, language) => {
      if (!text || typeof text !== 'string') return text || '';
      if (!text.includes('/')) return text;
      const parts = text.split('/');
      if (language === "English") {
        return parts[0].trim();
      } else {
        return parts[1] ? parts[1].trim() : parts[0].trim();
      }
    };

    let groupLabels = [];
    let groupValues = [];
    for (let i = 0; i < loadedData.length; i++) {
      // Get bilingual label for the university name
      const label = getBilingualText(loadedData[i][keys[0]], props.language);
      groupLabels.push(label);
      let values = []
      for (let j = 1; j < keys.length; j++) {
        values.push(loadedData[i][keys[j]] || 0);
      }
      groupValues.push(values);
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Padding
    const padding = { top: 40, right: 40, bottom: 80, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Chart settings
    const barWidth = 20;
    const barGap = 8;
    const groupGap = 30;
    const groupWidth = (barWidth * 3) + (barGap * 2);
    const totalWidth = groupLabels.length * (groupWidth + groupGap);

    // Set canvas width to accommodate all bars
    canvas.width = Math.max(900, padding.left + totalWidth + padding.right);
    
    // Re-get context after resizing
    const newCtx = canvas.getContext('2d');
    const newWidth = canvas.width;
    
    // Redraw with new dimensions
    drawChart(newCtx, newWidth, groupLabels, groupValues);

  }, [loadedData, props.language, checkedCategories]);

  // Helper function to draw the chart
  function drawChart(ctx, canvasWidth, groupLabels, groupValues) {
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 80, left: 80 };
    const chartWidth = canvasWidth - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Colors
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    const colorNames = props.language === "English" 
      ? ['Full-time Undergrad', 'Full-time Graduate', 'Part-time Undergrad']
      : ['Étudiants de premier cycle à temps plein', 'Étudiants de cycle supérieur à temps plein', 'Étudiants de premier cycle à temps partiel'];

    // Filter which categories to show
    const activeCategories = colorNames.filter((_, index) => {
      const key = props.language === "English" 
        ? ['Full-time Undergrad', 'Full-time Graduate', 'Part-time Undergrad'][index]
        : ['Étudiants de premier cycle à temps plein', 'Étudiants de cycle supérieur à temps plein', 'Étudiants de premier cycle à temps partiel'][index];
      return checkedCategories[key] !== false;
    });

    // Get active indices
    const activeIndices = [];
    colorNames.forEach((name, index) => {
      const key = props.language === "English" 
        ? ['Full-time Undergrad', 'Full-time Graduate', 'Part-time Undergrad'][index]
        : ['Étudiants de premier cycle à temps plein', 'Étudiants de cycle supérieur à temps plein', 'Étudiants de premier cycle à temps partiel'][index];
      if (checkedCategories[key] !== false) {
        activeIndices.push(index);
      }
    });

    // Find max value considering only active categories
    let maxValue = 0;
    groupValues.forEach(values => {
      activeIndices.forEach(idx => {
        if (values[idx] > maxValue) maxValue = values[idx];
      });
    });
    maxValue = Math.ceil(maxValue / 10000) * 10000; // Round up to nearest 10000
    if (maxValue === 0) maxValue = 10000;

    // Scale function
    const getY = (value) => {
      return padding.top + chartHeight - (value / maxValue) * chartHeight;
    };

    // Chart settings
    const barWidth = 22;
    const barGap = 6;
    const groupGap = 25;
    const groupWidth = (barWidth * activeIndices.length) + (barGap * (activeIndices.length - 1));

    // ----- Draw Grid Lines -----
    ctx.strokeStyle = '#e9edf2';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const gridLines = 6;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvasWidth - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      const value = maxValue - (i / gridLines) * maxValue;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(value).toLocaleString(), padding.left - 10, y);
    }
    ctx.setLineDash([]);

    // ----- Draw Bars (only active categories) -----
    groupLabels.forEach((label, groupIndex) => {
      const groupX = padding.left + groupIndex * (groupWidth + groupGap);
      const values = groupValues[groupIndex];

      activeIndices.forEach((barIndex, positionIndex) => {
        const value = values[barIndex] || 0;
        const x = groupX + positionIndex * (barWidth + barGap);
        const y = getY(value);
        const barHeight = chartHeight - (y - padding.top);

        // Bar shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        // Bar
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        
        ctx.fillStyle = colors[barIndex];
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Value on top of bar
        if (value > 0) {
          ctx.fillStyle = '#0f172a';
          ctx.font = '9px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(Math.round(value).toLocaleString(), x + barWidth / 2, y - 4);
        }
      });

      // X-axis label (rotated)
      ctx.save();
      ctx.fillStyle = '#1e293b';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.translate(groupX + groupWidth / 2, height - padding.bottom + 10);
      ctx.rotate(-Math.PI / 4);
      
      // Truncate long names
      let displayLabel = label;
      if (label.length > 25) {
        displayLabel = label.substring(0, 22) + '...';
      }
      ctx.fillText(displayLabel, 0, 0);
      ctx.restore();
    });

    // ----- Title -----
    const title = props.language === "English" 
      ? 'University Enrollment by Category'
      : 'Inscriptions universitaires par catégorie';
    
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(title, canvasWidth / 2, padding.top - 10);

    // ----- Y-axis Label -----
    const yAxisLabel = props.language === "English" ? 'Number of Students' : "Nombre d'étudiants";
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(18, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yAxisLabel, 0, 0);
    ctx.restore();

    // ----- X-axis Label -----
    const xAxisLabel = props.language === "English" ? 'University' : 'Université';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(xAxisLabel, canvasWidth / 2, height - padding.bottom + 100);
  }

  // Handle checkbox change
  const handleCheckboxChange = (key) => {
    setCheckedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Conditional returns (after all hooks)
  if (isLoading) {
    return <div className="loading">📂 Loading graph data...</div>;
  }

  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }

  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Colors for the legend/menu
  const colors = ['#3b82f6', '#10b981', '#f59e0b'];
  const colorNames = props.language === "English" 
    ? ['Full-time Undergrad', 'Full-time Graduate', 'Part-time Undergrad']
    : ['Étudiants de premier cycle à temps plein', 'Étudiants de cycle supérieur à temps plein', 'Étudiants de premier cycle à temps partiel'];
  
  const englishKeys = ['Full-time Undergrad', 'Full-time Graduate', 'Part-time Undergrad'];

  return (
    <div className="university-graph-container">
      <div className="university-graph-scroll-wrapper">
        <canvas 
          ref={canvasRef} 
          height="450"
          style={{ height: '450px', width: 'auto', minWidth: '900px' }}
        />
      </div>
      
      {/* Combined Legend and Menu at the bottom */}
      <div style={{ 
        marginTop: '15px', 
        padding: '12px 15px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px 20px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {colorNames.map((name, index) => {
          const key = englishKeys[index];
          const isChecked = checkedCategories[key] !== false;
          const color = colors[index];
          
          return (
            <label 
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: isChecked ? '#ffffff' : '#f1f5f9',
                borderRadius: '6px',
                border: isChecked ? `2px solid ${color}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '13px',
                whiteSpace: 'nowrap'
              }}
            >
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => handleCheckboxChange(key)}
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  accentColor: color
                }}
              />
              <span style={{ 
                display: 'inline-block', 
                width: '16px', 
                height: '4px', 
                backgroundColor: color,
                borderRadius: '2px'
              }} />
              <span style={{ color: '#0f172a', fontWeight: isChecked ? '500' : '400' }}>
                {name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function FoodGraph(props) {
  // ALL hooks must be at the top, before any conditional returns
  const canvasRef = React.useRef(null);
  
  // State for checked lines
  const [checkedLines, setCheckedLines] = React.useState({
    'Food Index': true,
    'All-items Index': true
  });
  
  // useEffect must be declared here, before conditional returns
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run if data is available
    if (!loadedData || loadedData.length === 0) return;

    const keys = Object.keys(loadedData[0]);
    
    // Helper function to get bilingual text
    const getBilingualText = (text, language) => {
      if (!text || typeof text !== 'string') return text || '';
      if (!text.includes('/')) return text;
      const parts = text.split('/');
      if (language === "English") {
        return parts[0].trim();
      } else {
        return parts[1] ? parts[1].trim() : parts[0].trim();
      }
    };
    
    // Extract data with bilingual labels
    let xlabels = [];
    let foodValues = [];
    let itemValues = [];
    
    for (let i = 0; i < loadedData.length; i++) {
      // Get bilingual label for the month
      const label = getBilingualText(loadedData[i][keys[0]], props.language);
      xlabels.push(label);
      foodValues.push(loadedData[i][keys[1]] || 0);
      itemValues.push(loadedData[i][keys[2]] || 0);
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Padding
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max value for y-axis (max of both datasets, min 12)
    // Only consider visible lines
    let allValues = [];
    if (checkedLines['Food Index'] !== false) {
      allValues = allValues.concat(foodValues);
    }
    if (checkedLines['All-items Index'] !== false) {
      allValues = allValues.concat(itemValues);
    }
    const maxValue = Math.max(12, ...allValues);
    const minValue = 0;

    // Scale functions
    const getX = (index) => {
      return padding.left + (index / (xlabels.length - 1)) * chartWidth;
    };

    const getY = (value) => {
      return padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
    };

    // ----- Draw Grid Lines -----
    ctx.strokeStyle = '#e9edf2';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const gridLines = 6;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      const value = maxValue - (i / gridLines) * (maxValue - minValue);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toFixed(1) + '%', padding.left - 10, y);
    }
    ctx.setLineDash([]);

    // ----- Draw X-axis Labels -----
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Show every 6th label to avoid overcrowding
    const step = Math.max(1, Math.floor(xlabels.length / 12));
    xlabels.forEach((label, i) => {
      if (i % step === 0 || i === xlabels.length - 1) {
        const x = getX(i);
        ctx.fillText(label, x, height - padding.bottom + 8);
      }
    });

    // ----- Draw Food Line (Blue) - only if checked -----
    if (checkedLines['Food Index'] !== false) {
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      foodValues.forEach((value, i) => {
        const x = getX(i);
        const y = getY(value);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw Food Data Points (no value labels)
      foodValues.forEach((value, i) => {
        const x = getX(i);
        const y = getY(value);

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Fill area under food line
      const gradientUnderFood = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradientUnderFood.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      gradientUnderFood.addColorStop(1, 'rgba(59, 130, 246, 0.01)');

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(foodValues[0]));
      foodValues.forEach((value, i) => {
        ctx.lineTo(getX(i), getY(value));
      });
      ctx.lineTo(getX(foodValues.length - 1), padding.top + chartHeight);
      ctx.lineTo(getX(0), padding.top + chartHeight);
      ctx.closePath();
      ctx.fillStyle = gradientUnderFood;
      ctx.fill();
    }

    // ----- Draw All-Items Line (Green) - only if checked -----
    if (checkedLines['All-items Index'] !== false) {
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      itemValues.forEach((value, i) => {
        const x = getX(i);
        const y = getY(value);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw All-Items Data Points (no value labels)
      itemValues.forEach((value, i) => {
        const x = getX(i);
        const y = getY(value);

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Fill area under all-items line
      const gradientUnderItem = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradientUnderItem.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      gradientUnderItem.addColorStop(1, 'rgba(16, 185, 129, 0.01)');

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(itemValues[0]));
      itemValues.forEach((value, i) => {
        ctx.lineTo(getX(i), getY(value));
      });
      ctx.lineTo(getX(itemValues.length - 1), padding.top + chartHeight);
      ctx.lineTo(getX(0), padding.top + chartHeight);
      ctx.closePath();
      ctx.fillStyle = gradientUnderItem;
      ctx.fill();
    }

    // ----- Title -----
    const title = props.language === "English" 
      ? 'Food Price Index vs All-items Index'
      : 'Indice des prix des aliments vs Indice d\'ensemble';
    
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(title, width / 2, padding.top - 10);

    // ----- Y-axis Label -----
    const yAxisLabel = props.language === "English" ? 'Annual Change (%)' : 'Variation annuelle (%)';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(16, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yAxisLabel, 0, 0);
    ctx.restore();

  }, [loadedData, props.language, checkedLines]);

  // Now conditional returns (after all hooks)
  if (isLoading) {
    return <div className="loading">📂 Loading graph data...</div>;
  }

  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }

  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Get bilingual labels for the menu
  const foodLabel = props.language === "English" ? 'Food Index' : 'Indice des aliments';
  const allItemsLabel = props.language === "English" ? 'All-items Index' : 'Indice d\'ensemble';
  
  const menuItems = [
    { key: 'Food Index', label: foodLabel, color: '#3b82f6' },
    { key: 'All-items Index', label: allItemsLabel, color: '#10b981' }
  ];

  // Handle checkbox change
  const handleCheckboxChange = (key) => {
    setCheckedLines(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="graph-container">
      <canvas 
        ref={canvasRef} 
        width="900" 
        height="450"
        style={{ width: '100%', height: 'auto', maxWidth: '900px' }}
      />
      
      {/* Combined Legend and Menu at the bottom */}
      <div style={{ 
        marginTop: '15px', 
        padding: '12px 15px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px 25px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {menuItems.map((item) => {
          const isChecked = checkedLines[item.key] !== false;
          const color = item.color;
          
          return (
            <label 
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: isChecked ? '#ffffff' : '#f1f5f9',
                borderRadius: '6px',
                border: isChecked ? `2px solid ${color}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '13px',
                whiteSpace: 'nowrap'
              }}
            >
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => handleCheckboxChange(item.key)}
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  accentColor: color
                }}
              />
              <span style={{ 
                display: 'inline-block', 
                width: '20px', 
                height: '3px', 
                backgroundColor: color,
                borderRadius: '2px'
              }} />
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '8px', 
                backgroundColor: color,
                borderRadius: '50%',
                marginLeft: '2px'
              }} />
              <span style={{ color: '#0f172a', fontWeight: isChecked ? '500' : '400' }}>
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function GraduateIncomeGraph(props) {
  // ALL hooks must be at the top, before any conditional returns
  const canvasRef = React.useRef(null);
  
  // State for checked qualifications
  const [localCheckedState, setLocalCheckedState] = React.useState({});
  
  // useEffect must be declared here, before conditional returns
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run if data is available
    if (!loadedData || loadedData.length === 0) return;

    // Get all keys from the first row
    const keys = Object.keys(loadedData[0]);
    
    // Helper function to check if a value is a non-empty string
    const isNonEmptyString = (value) => {
      return typeof value === 'string' && value.trim() !== '';
    };
    
    // Helper function to get bilingual text
    const getBilingualText = (text, language) => {
      if (!text || typeof text !== 'string') return text || '';
      if (!text.includes('/')) return text;
      const parts = text.split('/');
      if (language === "English") {
        return parts[0].trim();
      } else {
        return parts[1] ? parts[1].trim() : parts[0].trim();
      }
    };
    
    // Initialize checked state if empty
    if (Object.keys(localCheckedState).length === 0) {
      const initialChecked = {};
      for (let i = 0; i < loadedData.length; i++) {
        const row = loadedData[i];
        const qual = getBilingualText(row[keys[0]], props.language);
        if (isNonEmptyString(qual) && !initialChecked[qual]) {
          initialChecked[qual] = true;
        }
      }
      setLocalCheckedState(initialChecked);
    }
    
    // Group data by qualification and field of study
    const qualificationData = {};
    let currentQual = null;
    
    // FIRST: Get all unique fields across ALL qualifications (for complete color mapping)
    const allFieldsSet = new Set();
    for (let i = 0; i < loadedData.length; i++) {
      const row = loadedData[i];
      const fieldOfStudy = getBilingualText(row[keys[1]], props.language);
      if (isNonEmptyString(fieldOfStudy) && fieldOfStudy !== 'Total, field of study') {
        allFieldsSet.add(fieldOfStudy);
      }
    }
    const allPossibleFields = Array.from(allFieldsSet);
    
    // Sort fields for consistent order
    const fieldOrder = [
      'STEM',
      'Science and science technology',
      'Engineering and engineering technology',
      'Mathematics and computer and information science',
      'BHASE',
      'Business and administration',
      'Arts and humanities',
      'Social and behavioural sciences',
      'Legal professions and studies',
      'Health care',
      'Education and teaching',
      'Trades, services, natural resources and conservation'
    ];
    allPossibleFields.sort((a, b) => {
      const indexA = fieldOrder.indexOf(a);
      const indexB = fieldOrder.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
    
    // Now group data by qualification
    for (let i = 0; i < loadedData.length; i++) {
      const row = loadedData[i];
      const qual = getBilingualText(row[keys[0]], props.language);
      const fieldOfStudy = getBilingualText(row[keys[1]], props.language);
      let numGraduates = row[keys[2]];
      let salary = row[keys[3]];
      
      // Convert empty/undefined/null values to 0
      if (numGraduates === '' || numGraduates === null || numGraduates === undefined || numGraduates === '..') {
        numGraduates = 0;
      }
      if (salary === '' || salary === null || salary === undefined || salary === '..') {
        salary = 0;
      }
      
      numGraduates = typeof numGraduates === 'number' ? numGraduates : 0;
      salary = typeof salary === 'number' ? salary : 0;
      
      if (isNonEmptyString(qual)) {
        currentQual = qual;
        if (!qualificationData[currentQual]) {
          qualificationData[currentQual] = [];
        }
        if (isNonEmptyString(fieldOfStudy) && fieldOfStudy !== 'Total, field of study') {
          qualificationData[currentQual].push({
            fieldOfStudy: fieldOfStudy,
            numGraduates: numGraduates,
            salary: salary
          });
        }
      } else if (currentQual && isNonEmptyString(fieldOfStudy) && fieldOfStudy !== 'Total, field of study') {
        qualificationData[currentQual].push({
          fieldOfStudy: fieldOfStudy,
          numGraduates: numGraduates,
          salary: salary
        });
      }
    }

    // Prepare data for the chart
    const qualifications = Object.keys(qualificationData);
    
    // Filter out qualifications that are unchecked
    const filteredQualifications = qualifications.filter(qual => {
      const isChecked = localCheckedState[qual] !== false;
      return isChecked;
    });

    const ctx = canvasRef.current.getContext('2d');
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    ctx.clearRect(0, 0, width, height);

    // Padding
    const padding = { top: 60, right: 40, bottom: 120, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
      '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6',
      '#f43f5e', '#8b5cf6', '#0ea5e9', '#84cc16', '#d946ef'
    ];

    // Create color map for all possible fields
    const fieldColorMap = {};
    allPossibleFields.forEach((field, index) => {
      fieldColorMap[field] = colors[index % colors.length];
    });

    let maxSalary = 0;
    filteredQualifications.forEach(qual => {
      qualificationData[qual].forEach(item => {
        if (item.salary > maxSalary) {
          maxSalary = item.salary;
        }
      });
    });
    maxSalary = Math.ceil(maxSalary / 10000) * 10000;
    if (maxSalary === 0) maxSalary = 10000;

    const numQualifications = filteredQualifications.length;
    const numFields = allPossibleFields.length;
    
    // Calculate bar width and spacing
    if (numFields > 0 && numQualifications > 0) {
      const gapBetweenBars = 3;
      const minGroupGap = 40;
      const maxBarWidth = 28;
      const minBarWidth = 6;
      
      const groupContentWidth = numFields * maxBarWidth + (numFields - 1) * gapBetweenBars;
      const totalWidthNeeded = numQualifications * groupContentWidth + (numQualifications - 1) * minGroupGap;
      
      let barWidth = maxBarWidth;
      let gapBetweenGroups = minGroupGap;
      
      if (totalWidthNeeded > chartWidth) {
        const availableForBars = chartWidth - (numQualifications - 1) * minGroupGap;
        const totalBars = numQualifications * numFields;
        const totalGaps = numQualifications * (numFields - 1);
        barWidth = Math.max(minBarWidth, (availableForBars - totalGaps * gapBetweenBars) / totalBars);
      }
      
      const actualGroupWidth = numFields * barWidth + (numFields - 1) * gapBetweenBars;
      const remainingSpace = chartWidth - numQualifications * actualGroupWidth;
      gapBetweenGroups = Math.max(minGroupGap, remainingSpace / (numQualifications + 1));
      
      if (numQualifications === 1) {
        gapBetweenGroups = Math.max(60, remainingSpace / 2);
      }

      const getY = (value) => {
        return padding.top + chartHeight - (value / maxSalary) * chartHeight;
      };

      // ----- Draw Grid Lines - EXTENDED FULL WIDTH -----
      ctx.strokeStyle = '#e9edf2';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      const gridLines = 6;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (i / gridLines) * chartHeight;
        ctx.beginPath();
        // Extend grid lines from left edge to right edge of canvas
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        const value = maxSalary - (i / gridLines) * maxSalary;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText('$' + Math.round(value).toLocaleString(), padding.left - 10, y);
      }
      ctx.setLineDash([]);

      // Draw Bars
      filteredQualifications.forEach((qual, qualIndex) => {
        const groupX = padding.left + gapBetweenGroups + qualIndex * (actualGroupWidth + gapBetweenGroups);
        
        const fieldDataMap = {};
        qualificationData[qual].forEach(item => {
          fieldDataMap[item.fieldOfStudy] = item;
        });
        
        allPossibleFields.forEach((field, fieldIdx) => {
          const item = fieldDataMap[field];
          const salary = item ? item.salary : 0;
          
          const x = groupX + fieldIdx * (barWidth + gapBetweenBars);
          const y = getY(salary);
          const barHeight = chartHeight - (y - padding.top);

          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2;
          
          ctx.fillStyle = fieldColorMap[field] || colors[fieldIdx % colors.length];
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, Math.max(barHeight, 1), 3);
          ctx.fill();

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        });

        // X-axis label - positioned lower
        ctx.save();
        ctx.fillStyle = '#1e293b';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.translate(groupX + actualGroupWidth / 2, height - padding.bottom + 30);
        ctx.rotate(-Math.PI / 4);
        
        let displayLabel = qual;
        if (qual.length > 20) {
          displayLabel = qual.substring(0, 17) + '...';
        }
        ctx.fillText(displayLabel, 0, 0);
        ctx.restore();
      });
    }

    // ----- Title -----
    const title = props.language === "English" 
      ? 'Median Employment Income by Educational Qualification and Field of Study'
      : 'Revenu d\'emploi médian selon le diplôme et le domaine d\'études';
    
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(title, width / 2, padding.top - 10);

    // ----- Y-axis Label -----
    const yAxisLabel = props.language === "English" ? 'Median Income ($)' : 'Revenu médian ($)';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(18, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yAxisLabel, 0, 0);
    ctx.restore();

  }, [loadedData, props.language, localCheckedState]);

  // Conditional returns (after all hooks)
  if (isLoading) {
    return <div className="loading">📂 Loading graph data...</div>;
  }

  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }

  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Get data for canvas width calculation and checkbox menu
  const keys = Object.keys(loadedData[0]);
  const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim() !== '';
  };
  
  const getBilingualText = (text, language) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!text.includes('/')) return text;
    const parts = text.split('/');
    if (language === "English") {
      return parts[0].trim();
    } else {
      return parts[1] ? parts[1].trim() : parts[0].trim();
    }
  };
  
  // Initialize localCheckedState if empty
  if (Object.keys(localCheckedState).length === 0) {
    const initialChecked = {};
    for (let i = 0; i < loadedData.length; i++) {
      const row = loadedData[i];
      const qual = getBilingualText(row[keys[0]], props.language);
      if (isNonEmptyString(qual) && !initialChecked[qual]) {
        initialChecked[qual] = true;
      }
    }
    setTimeout(() => setLocalCheckedState(initialChecked), 0);
  }
  
  const qualificationData = {};
  let currentQual = null;
  
  // Get all possible fields
  const allFieldsSet = new Set();
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    const fieldOfStudy = getBilingualText(row[keys[1]], props.language);
    if (isNonEmptyString(fieldOfStudy) && fieldOfStudy !== 'Total, field of study') {
      allFieldsSet.add(fieldOfStudy);
    }
  }
  const fieldOrder = [
    'STEM',
    'Science and science technology',
    'Engineering and engineering technology',
    'Mathematics and computer and information science',
    'BHASE',
    'Business and administration',
    'Arts and humanities',
    'Social and behavioural sciences',
    'Legal professions and studies',
    'Health care',
    'Education and teaching',
    'Trades, services, natural resources and conservation'
  ];
  const allPossibleFields = Array.from(allFieldsSet).sort((a, b) => {
    const indexA = fieldOrder.indexOf(a);
    const indexB = fieldOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  
  // Group data
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    const qual = getBilingualText(row[keys[0]], props.language);
    const fieldOfStudy = getBilingualText(row[keys[1]], props.language);
    let numGraduates = row[keys[2]];
    let salary = row[keys[3]];
    
    if (numGraduates === '' || numGraduates === null || numGraduates === undefined || numGraduates === '..') {
      numGraduates = 0;
    }
    if (salary === '' || salary === null || salary === undefined || salary === '..') {
      salary = 0;
    }
    
    numGraduates = typeof numGraduates === 'number' ? numGraduates : 0;
    salary = typeof salary === 'number' ? salary : 0;
    
    if (isNonEmptyString(qual)) {
      currentQual = qual;
      if (!qualificationData[currentQual]) {
        qualificationData[currentQual] = [];
      }
      if (isNonEmptyString(fieldOfStudy) && fieldOfStudy !== 'Total, field of study') {
        qualificationData[currentQual].push({
          fieldOfStudy: fieldOfStudy,
          numGraduates: numGraduates,
          salary: salary
        });
      }
    } else if (currentQual && isNonEmptyString(fieldOfStudy) && fieldOfStudy !== 'Total, field of study') {
      qualificationData[currentQual].push({
        fieldOfStudy: fieldOfStudy,
        numGraduates: numGraduates,
        salary: salary
      });
    }
  }

  const allQualifications = Object.keys(qualificationData).filter(qual => {
    return qualificationData[qual].length > 0;
  });

  // Get visible qualifications
  const visibleQualifications = allQualifications.filter(qual => {
    return localCheckedState[qual] !== false;
  });

  // Colors for fields
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6',
    '#f43f5e', '#8b5cf6', '#0ea5e9', '#84cc16', '#d946ef'
  ];
  
  const fieldColorMap = {};
  allPossibleFields.forEach((field, index) => {
    fieldColorMap[field] = colors[index % colors.length];
  });

  // Handle checkbox change
  const handleCheckboxChange = (qual) => {
    setLocalCheckedState(prev => ({
      ...prev,
      [qual]: !prev[qual]
    }));
  };

  // Get checked state
  const checkedState = localCheckedState;

  // Calculate canvas dimensions to fit all content without scrolling
  const numVisible = Math.max(visibleQualifications.length, 1);
  const calculatedWidth = Math.max(1100, numVisible * 130 + 180);
  const legendRows = Math.ceil(allPossibleFields.length / 6);
  const calculatedHeight = Math.max(550, 550 + legendRows * 25);

  return (
    <div className="graduate-income-graph-container" style={{ padding: '20px', overflow: 'visible' }}>
      <div className="graduate-income-graph-scroll-wrapper" style={{ overflow: 'visible' }}>
        <canvas 
          ref={canvasRef} 
          width={calculatedWidth}
          height={calculatedHeight}
          style={{ 
            width: '100%', 
            height: calculatedHeight + 'px', 
            maxWidth: '100%',
            display: 'block'
          }}
        />
      </div>
      
      {/* Legend */}
      {allPossibleFields.length > 0 && (
        <div style={{ 
          marginTop: '15px', 
          padding: '12px 15px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(6, Math.max(2, allPossibleFields.length))}, 1fr)`,
          gap: '4px 15px',
          justifyItems: 'start',
          alignItems: 'center',
          maxWidth: '100%'
        }}>
          {allPossibleFields.map((field) => {
            const color = fieldColorMap[field] || colors[0];
            return (
              <div 
                key={field}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: '#0f172a',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ 
                  display: 'inline-block', 
                  width: '14px', 
                  height: '4px', 
                  backgroundColor: color,
                  borderRadius: '2px'
                }} />
                <span>
                  {field.length > 18 ? field.substring(0, 15) + '...' : field}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Checkbox Menu */}
      <div style={{ 
        marginTop: '10px', 
        padding: '10px 15px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px 12px',
        justifyContent: 'center',
        maxHeight: '80px',
        overflowY: 'auto',
        alignItems: 'center'
      }}>
        <span style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          color: '#64748b',
          marginRight: '8px',
          flexShrink: 0
        }}>
          {props.language === "English" ? 'Show/Hide:' : 'Afficher/Masquer :'}
        </span>
        {allQualifications.map((qual) => {
          const isChecked = checkedState[qual] !== false;
          
          return (
            <label 
              key={qual}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                backgroundColor: isChecked ? '#ffffff' : '#e2e8f0',
                borderRadius: '4px',
                border: isChecked ? '1px solid #94a3b8' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '11px',
                whiteSpace: 'nowrap'
              }}
            >
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => handleCheckboxChange(qual)}
                style={{
                  width: '13px',
                  height: '13px',
                  cursor: 'pointer',
                  accentColor: '#3b82f6'
                }}
              />
              <span style={{ color: '#0f172a', fontWeight: isChecked ? '500' : '400' }}>
                {qual.length > 20 ? qual.substring(0, 17) + '...' : qual}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
function HousingGraph(props) {
  // ALL hooks must be at the top, before any conditional returns
  const canvasRef = React.useRef(null);
  
  // State for checked unit types
  const [checkedUnitTypes, setCheckedUnitTypes] = React.useState({});
  
  // useEffect must be declared here, before conditional returns
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run if data is available
    if (!loadedData || loadedData.length === 0) return;

    // Get all keys from the first row
    const keys = Object.keys(loadedData[0]);
    console.log('Housing Data Keys:', keys);
    
    // Helper function to get bilingual text
    const getBilingualText = (text, language) => {
      if (!text || typeof text !== 'string') return text || '';
      if (!text.includes('/')) return text;
      const parts = text.split('/');
      if (language === "English") {
        return parts[0].trim();
      } else {
        return parts[1] ? parts[1].trim() : parts[0].trim();
      }
    };
    
    // The first column is the unit type, subsequent columns are quarters
    const unitTypeKey = keys[0];
    const quarters = keys.slice(1); // All other columns are quarters
    
    // Prepare data for the chart
    const unitTypes = [];
    const unitData = {};
    
    // Extract data from loadedData
    // Each row represents a unit type, and each column is a quarter
    for (let i = 0; i < loadedData.length; i++) {
      const row = loadedData[i];
      let unitType = row[unitTypeKey];
      
      // Skip empty unit types
      if (!unitType || unitType.trim() === '') continue;
      
      // Get bilingual text for unit type
      unitType = getBilingualText(unitType, props.language);
      
      unitTypes.push(unitType);
      unitData[unitType] = [];
      
      // For each quarter, get the value
      quarters.forEach(quarter => {
        const value = row[quarter];
        unitData[unitType].push(typeof value === 'number' ? value : 0);
      });
    }

    // Filter out "Total units" from being displayed (optional)
    const totalUnitsLabel = props.language === "English" ? 'Total units' : 'Total des unités';
    const displayUnitTypes = unitTypes.filter(type => type !== totalUnitsLabel);
    
    // If no unit types to display, show all
    const activeUnitTypes = displayUnitTypes.length > 0 ? displayUnitTypes : unitTypes;

    // Initialize checked state if empty
    if (Object.keys(checkedUnitTypes).length === 0) {
      const initialChecked = {};
      activeUnitTypes.forEach(type => {
        initialChecked[type] = true;
      });
      setCheckedUnitTypes(initialChecked);
    }

    // Filter unit types based on checked state
    const filteredUnitTypes = activeUnitTypes.filter(type => {
      return checkedUnitTypes[type] !== false;
    });

    // Colors for different unit types - use original indices for stable colors
    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
      '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6',
      '#f43f5e', '#84cc16', '#d946ef'
    ];

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Padding - reduced bottom padding since legend is now outside canvas
    const padding = { top: 60, right: 60, bottom: 80, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max value for y-axis (only for filtered unit types)
    let maxValue = 0;
    filteredUnitTypes.forEach(type => {
      const values = unitData[type] || [];
      values.forEach(value => {
        if (value > maxValue) maxValue = value;
      });
    });
    maxValue = Math.ceil(maxValue / 1000) * 1000; // Round up to nearest 1000
    if (maxValue === 0) maxValue = 1000; // Prevent division by zero

    // Scale functions
    const getX = (index) => {
      return padding.left + (index / (quarters.length - 1)) * chartWidth;
    };

    const getY = (value) => {
      return padding.top + chartHeight - (value / maxValue) * chartHeight;
    };

    // ----- Draw Grid Lines -----
    ctx.strokeStyle = '#e9edf2';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const gridLines = 6;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      const value = maxValue - (i / gridLines) * maxValue;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(value).toLocaleString(), padding.left - 10, y);
    }
    ctx.setLineDash([]);

    // ----- Draw X-axis Labels (Quarters) -----
    ctx.fillStyle = '#1e293b';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    quarters.forEach((quarter, i) => {
      const x = getX(i);
      // Get bilingual text for quarter
      const quarterLabel = getBilingualText(quarter, props.language);
      ctx.save();
      ctx.translate(x, height - padding.bottom + 15);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(quarterLabel, 0, 0);
      ctx.restore();
    });

    // ----- Draw Lines for Each Unit Type (only filtered ones) -----
    // Use original index for consistent colors
    filteredUnitTypes.forEach((type) => {
      const values = unitData[type] || [];
      // Find the original index of this unit type
      const originalIndex = activeUnitTypes.indexOf(type);
      const color = colors[originalIndex % colors.length];
      
      // Skip if all values are zero
      if (values.length === 0 || values.every(v => v === 0)) return;
      
      // Draw the line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      values.forEach((value, i) => {
        const x = getX(i);
        const y = getY(value);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw data points with value labels
      values.forEach((value, i) => {
        const x = getX(i);
        const y = getY(value);

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, color + '4D'); // 30% opacity
        gradient.addColorStop(1, color + '00'); // 0% opacity
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Value label on data point
        if (value > 0) {
          ctx.fillStyle = '#0f172a';
          ctx.font = '9px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(Math.round(value).toLocaleString(), x, y - 8);
        }
      });

      // Fill area under the line
      const gradientUnder = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradientUnder.addColorStop(0, color + '26'); // 15% opacity
      gradientUnder.addColorStop(1, color + '03'); // 1% opacity

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(values[0]));
      values.forEach((value, i) => {
        ctx.lineTo(getX(i), getY(value));
      });
      ctx.lineTo(getX(values.length - 1), padding.top + chartHeight);
      ctx.lineTo(getX(0), padding.top + chartHeight);
      ctx.closePath();
      ctx.fillStyle = gradientUnder;
      ctx.fill();
    });

    // ----- Title -----
    const title = props.language === "English" 
      ? 'Housing Starts by Unit Type'
      : 'Mises en chantier par type d\'unité';
    
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(title, width / 2, padding.top - 10);

    // ----- Y-axis Label -----
    const yAxisLabel = props.language === "English" 
      ? 'Number of Housing Starts' 
      : 'Nombre de mises en chantier';
    
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(18, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yAxisLabel, 0, 0);
    ctx.restore();

    // ----- X-axis Label -----
    const xAxisLabel = props.language === "English" ? 'Quarter' : 'Trimestre';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(xAxisLabel, width / 2, height - padding.bottom + 55);

  }, [loadedData, props.language, checkedUnitTypes]);

  // Conditional returns (after all hooks)
  if (isLoading) {
    return <div className="loading">📂 Loading graph data...</div>;
  }

  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }

  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Get data for the menu
  const keys = Object.keys(loadedData[0]);
  const getBilingualText = (text, language) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!text.includes('/')) return text;
    const parts = text.split('/');
    if (language === "English") {
      return parts[0].trim();
    } else {
      return parts[1] ? parts[1].trim() : parts[0].trim();
    }
  };
  
  const unitTypeKey = keys[0];
  const quarters = keys.slice(1);
  
  const unitTypes = [];
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    let unitType = row[unitTypeKey];
    if (!unitType || unitType.trim() === '') continue;
    unitType = getBilingualText(unitType, props.language);
    unitTypes.push(unitType);
  }

  const totalUnitsLabel = props.language === "English" ? 'Total units' : 'Total des unités';
  const displayUnitTypes = unitTypes.filter(type => type !== totalUnitsLabel);
  const activeUnitTypes = displayUnitTypes.length > 0 ? displayUnitTypes : unitTypes;

  // Initialize checked state if empty
  if (Object.keys(checkedUnitTypes).length === 0) {
    const initialChecked = {};
    activeUnitTypes.forEach(type => {
      initialChecked[type] = true;
    });
    // Use setTimeout to avoid rendering issues
    setTimeout(() => setCheckedUnitTypes(initialChecked), 0);
  }

  // Colors for the legend/menu - use original indices for stable colors
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6',
    '#f43f5e', '#84cc16', '#d946ef'
  ];

  // Handle checkbox change
  const handleCheckboxChange = (type) => {
    setCheckedUnitTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="housing-graph-container" style={{ padding: '20px' }}>
      <div className="housing-graph-scroll-wrapper" style={{ overflowX: 'auto' }}>
        <canvas 
          ref={canvasRef} 
          width={Math.max(900, quarters.length * 30 + 200)}
          height="550"
          style={{ height: '550px', width: 'auto', minWidth: '900px' }}
        />
      </div>
      
      {/* Combined Legend and Menu at the bottom */}
      <div style={{ 
        marginTop: '15px', 
        padding: '12px 15px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 15px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {activeUnitTypes.map((type, index) => {
          const isChecked = checkedUnitTypes[type] !== false;
          // Use the original index for consistent colors
          const color = colors[index % colors.length];
          
          return (
            <label 
              key={type}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                backgroundColor: isChecked ? '#ffffff' : '#f1f5f9',
                borderRadius: '6px',
                border: isChecked ? `2px solid ${color}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => handleCheckboxChange(type)}
                style={{
                  width: '15px',
                  height: '15px',
                  cursor: 'pointer',
                  accentColor: color
                }}
              />
              <span style={{ 
                display: 'inline-block', 
                width: '16px', 
                height: '3px', 
                backgroundColor: color,
                borderRadius: '2px'
              }} />
              <span style={{ color: '#0f172a', fontWeight: isChecked ? '500' : '400' }}>
                {type.length > 20 ? type.substring(0, 17) + '...' : type}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}




function UniversityTable(props) {
  // Loading state
  if (isLoading) {
    return <div className="loading">📂 Loading table data...</div>;
  }
  
  // Error state
  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }
  
  // No data state
  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Get all keys from the first row
  const keys = Object.keys(loadedData[0]);
  console.log('Keys:', keys);
  
  // Helper function to get bilingual text
  const getBilingualText = (text, language) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!text.includes('/')) return text;
    const parts = text.split('/');
    if (language === "English") {
      return parts[0].trim();
    } else {
      return parts[1] ? parts[1].trim() : parts[0].trim();
    }
  };
  
  // Create bilingual header elements
  const headerLabels = keys.map((key) => {
    return getBilingualText(key, props.language);
  });
  
  const header = headerLabels.map((value, index) => {
    return (
      <p key={`header-${index}`} className="university-table-header">
        {value}
      </p>
    );
  });

  // Create data elements for each row
  let dataElements = [];
  
  // Loop through each row of the loaded data
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    
    // For each row, loop through each key
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      let value = row[key];
      
      // If it's the first column (University names), apply bilingual text
      if (j === 0 && typeof value === 'string') {
        value = getBilingualText(value, props.language);
      }
      
      // Format numbers
      let displayValue = value;
      if (typeof value === 'number') {
        displayValue = value.toLocaleString();
      }
      
      // Append the value inside a p element to dataElements
      dataElements.push(
        <p key={`row-${i}-col-${j}`} className="university-table-cell">
          {displayValue}
        </p>
      );
    }
  }

  return (
    <div className="university-grid">
      {header}
      {dataElements}
    </div>
  );
}

function FoodTable(props) {
  // Loading state
  if (isLoading) {
    return <div className="loading">📂 Loading table data...</div>;
  }
  
  // Error state
  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }
  
  // No data state
  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Get all keys from the first row
  const keys = Object.keys(loadedData[0]);
  console.log('Keys:', keys);
  
  // Helper function to get bilingual text
  const getBilingualText = (text, language) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!text.includes('/')) return text;
    const parts = text.split('/');
    if (language === "English") {
      return parts[0].trim();
    } else {
      return parts[1] ? parts[1].trim() : parts[0].trim();
    }
  };
  
  // Create bilingual header elements
  const headerLabels = keys.map((key) => {
    return getBilingualText(key, props.language);
  });
  
  const header = headerLabels.map((value, index) => {
    return (
      <p key={`header-${index}`} className="food-table-header">
        {value}
      </p>
    );
  });

  // Create data elements for each row
  let dataElements = [];
  
  // Loop through each row of the loaded data
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    
    // For each row, loop through each key
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      let value = row[key];
      
      // If it's the first column (Month names), apply bilingual text
      if (j === 0 && typeof value === 'string') {
        value = getBilingualText(value, props.language);
      }
      
      // Format numbers
      let displayValue = value;
      if (typeof value === 'number') {
        displayValue = value.toLocaleString();
      }
      
      // Append the value inside a p element to dataElements
      dataElements.push(
        <p key={`row-${i}-col-${j}`} className="food-table-cell">
          {displayValue}
        </p>
      );
    }
  }

  return (
    <div className="food-grid">
      {header}
      {dataElements}
    </div>
  );
}

function GraduateIncomeTable(props) {
  // Add loading, error, and no-data checks first
  if (isLoading) {
    return <div className="loading">📂 Loading table data...</div>;
  }
  
  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }
  
  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  console.log('Loaded data:', loadedData);
  
  // Get all keys from the first row
  const keys = Object.keys(loadedData[0]);
  console.log('Keys:', keys);
  
  // Helper function to check if a value is a non-empty string
  const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim() !== '';
  };
  
  // Helper function to get bilingual text
  const getBilingualText = (text, language) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!text.includes('/')) return text;
    const parts = text.split('/');
    if (language === "English") {
      return parts[0].trim();
    } else {
      return parts[1] ? parts[1].trim() : parts[0].trim();
    }
  };
  
  // Create bilingual header elements
  const headerLabels = [
    props.language === "English" ? 'Educational qualification' : 'Diplôme obtenu',
    props.language === "English" ? 'Field of study' : "Domaine d'études",
    props.language === "English" ? 'Number of Graduates' : 'Nombre de diplômés',
    props.language === "English" ? 'Salary' : 'Salaire'
  ];
  
  const header = headerLabels.map((value, index) => {
    return (
      <p key={`header-${index}`} className="graduate-income-table-header" style={{ fontWeight: 'bold', backgroundColor: '#e2e8f0', padding: '8px' }}>
        {value}
      </p>
    );
  });

  // Create data elements for each row
  let dataElements = [];
  let currentQual = null;
  
  // Loop through each row
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    const qual = getBilingualText(row[keys[0]], props.language);
    const fieldOfStudy = getBilingualText(row[keys[1]], props.language);
    const numGraduates = row[keys[2]];
    const salary = row[keys[3]];
    
    // Check if this row has a qualification (non-empty first column)
    if (isNonEmptyString(qual)) {
      currentQual = qual;
      
      // This is a qualification row - display the qualification in first column
      dataElements.push(
        <p key={`row-${i}-col-0`} className="graduate-income-table-cell" style={{ fontWeight: 'bold', backgroundColor: '#f8fafc', padding: '8px' }}>
          {qual}
        </p>
      );
      
      // Check if there's a field of study on the same row (like "Total, field of study")
      if (isNonEmptyString(fieldOfStudy)) {
        // Field of study
        dataElements.push(
          <p key={`row-${i}-col-1`} className="graduate-income-table-cell" style={{ padding: '8px' }}>
            {fieldOfStudy}
          </p>
        );
        
        // Number of Graduates
        dataElements.push(
          <p key={`row-${i}-col-2`} className="graduate-income-table-cell" style={{ textAlign: 'right', padding: '8px' }}>
            {typeof numGraduates === 'number' ? numGraduates.toLocaleString() : (numGraduates || '—')}
          </p>
        );
        
        // Salary
        dataElements.push(
          <p key={`row-${i}-col-3`} className="graduate-income-table-cell" style={{ textAlign: 'right', padding: '8px' }}>
            {typeof salary === 'number' ? `$${salary.toLocaleString()}` : (salary || '—')}
          </p>
        );
      } else {
        // Just the qualification with empty cells for other columns
        dataElements.push(
          <p key={`row-${i}-col-1`} className="graduate-income-table-cell" style={{ padding: '8px' }}>—</p>
        );
        dataElements.push(
          <p key={`row-${i}-col-2`} className="graduate-income-table-cell" style={{ textAlign: 'right', padding: '8px' }}>—</p>
        );
        dataElements.push(
          <p key={`row-${i}-col-3`} className="graduate-income-table-cell" style={{ textAlign: 'right', padding: '8px' }}>—</p>
        );
      }
    } 
    // If first column is empty and we have a current qualification, this is a sub-row (field of study)
    else if (currentQual && isNonEmptyString(fieldOfStudy)) {
      // Empty first column (indented)
      dataElements.push(
        <p key={`row-${i}-col-0`} className="graduate-income-table-cell" style={{ paddingLeft: '20px', padding: '8px' }}>
          {/* Empty - indented */}
        </p>
      );
      
      // Field of study
      dataElements.push(
        <p key={`row-${i}-col-1`} className="graduate-income-table-cell" style={{ paddingLeft: '20px', padding: '8px' }}>
          {fieldOfStudy}
        </p>
      );
      
      // Number of Graduates
      dataElements.push(
        <p key={`row-${i}-col-2`} className="graduate-income-table-cell" style={{ textAlign: 'right', padding: '8px' }}>
          {typeof numGraduates === 'number' ? numGraduates.toLocaleString() : (numGraduates || '—')}
        </p>
      );
      
      // Salary
      dataElements.push(
        <p key={`row-${i}-col-3`} className="graduate-income-table-cell" style={{ textAlign: 'right', padding: '8px' }}>
          {typeof salary === 'number' ? `$${salary.toLocaleString()}` : (salary || '—')}
        </p>
      );
    }
  }

  return (
    <div className="graduate-income-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 2fr 1fr 1fr', 
      gap: '1px', 
      padding: '10px', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0'
    }}>
      {header}
      {dataElements}
    </div>
  );
}
function HousingTable(props) {
  // Loading state
  if (isLoading) {
    return <div className="loading">📂 Loading table data...</div>;
  }
  
  // Error state
  if (loadError) {
    return <div className="error">❌ Error: {loadError}</div>;
  }
  
  // No data state
  if (!loadedData || loadedData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  console.log(loadedData);
  // Get all keys from the first row
  const keys = Object.keys(loadedData[0]);
  console.log('Keys:', keys);
  
  // Helper function to get bilingual text
  const getBilingualText = (text, language) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!text.includes('/')) return text;
    const parts = text.split('/');
    if (language === "English") {
      return parts[0].trim();
    } else {
      return parts[1] ? parts[1].trim() : parts[0].trim();
    }
  };
  
  // Create bilingual header elements
  const headerLabels = keys.map((key) => {
    return getBilingualText(key, props.language);
  });
  
  const header = headerLabels.map((value, index) => {
    return (
      <p key={`header-${index}`} className="housing-table-header">
        {value}
      </p>
    );
  });

  // Create data elements for each row
  let dataElements = [];
  
  // Loop through each row of the loaded data
  for (let i = 0; i < loadedData.length; i++) {
    const row = loadedData[i];
    
    // For each row, loop through each key
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      let value = row[key];
      
      // If it's the first column (Unit Type), apply bilingual text
      if (j === 0 && typeof value === 'string') {
        value = getBilingualText(value, props.language);
      }
      
      // Format numbers
      let displayValue = value;
      if (typeof value === 'number') {
        displayValue = value.toLocaleString();
      }
      
      // Append the value inside a p element to dataElements
      dataElements.push(
        <p key={`row-${i}-col-${j}`} className="housing-table-cell">
          {displayValue}
        </p>
      );
    }
  }

  return (
    <div className="housing-grid">
      {header}
      {dataElements}
    </div>
  );
}




function TableGraphButton(props) {
  const [isHovering, setIsHovering] = React.useState(null);

  return (
    <div 
      className="graph-table-buttons" 
      style={{
        display: 'flex',
        gap: '0',
        backgroundColor: '#f1f5f9',
        borderRadius: '10px',
        padding: '4px',
        width: 'fit-content',
        margin: '20px auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Sliding background with bounce effect */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: props.activeView === "graph" ? '4px' : 'calc(50% + 2px)',
        width: 'calc(50% - 4px)',
        height: 'calc(100% - 8px)',
        backgroundColor: '#ffffff',
        borderRadius: '7px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <div 
        className="graph-table-button"
        onClick={() => props.setVisual("graph")}
        onMouseEnter={() => setIsHovering("graph")}
        onMouseLeave={() => setIsHovering(null)}
        style={{
          padding: '10px 28px',
          borderRadius: '7px',
          cursor: 'pointer',
          transition: 'color 0.2s ease, transform 0.2s ease',
          color: props.activeView === "graph" ? '#0f172a' : (isHovering === "graph" ? '#1e293b' : '#64748b'),
          fontWeight: props.activeView === "graph" ? '600' : '400',
          fontSize: '14px',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
          border: 'none',
          flex: 1,
          textAlign: 'center',
          minWidth: '80px',
          transform: isHovering === "graph" && props.activeView !== "graph" ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        <p style={{ margin: 0 }}>📊 Graph</p>
      </div>
      <div 
        className="graph-table-button"
        onClick={() => props.setVisual("table")}
        onMouseEnter={() => setIsHovering("table")}
        onMouseLeave={() => setIsHovering(null)}
        style={{
          padding: '10px 28px',
          borderRadius: '7px',
          cursor: 'pointer',
          transition: 'color 0.2s ease, transform 0.2s ease',
          color: props.activeView === "table" ? '#0f172a' : (isHovering === "table" ? '#1e293b' : '#64748b'),
          fontWeight: props.activeView === "table" ? '600' : '400',
          fontSize: '14px',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
          border: 'none',
          flex: 1,
          textAlign: 'center',
          minWidth: '80px',
          transform: isHovering === "table" && props.activeView !== "table" ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        <p style={{ margin: 0 }}>📋 Table</p>
      </div>
    </div>
  );
}

function App() {
  const [visual, setVisual] = React.useState("graph");
  const language = window.sessionStorage.getItem("language");
  console.log("Language: " + language);
 
  let graphElement = null;
  let tableElement = null;
  
  if (file && file.name == "Enrollment by University/Inscriptions par Université") {
    graphElement = <UniversityGraph language={language}/>;
    tableElement = <UniversityTable language={language}/>;
  } else if (file && file.name == "Consumer Price Index (CPI): Statistics Canada's primary measure of inflation/Indice des prix à la consommation (IPC): la principale mesure de l'inflation selon Statistique Canada") {
    graphElement = <FoodGraph language={language}/>;
    tableElement = <FoodTable language={language}/>;
  } else if (file && file.name == "Characteristics and median employment income of postsecondary graduates two years after graduation/Caractéristiques et revenu médian d'emploi des diplômés postsecondaires deux ans après l'obtention de leur diplôme") {
    graphElement = <GraduateIncomeGraph language={language}/>;
    tableElement = <GraduateIncomeTable language={language}/>;
  } else if (file && file.name == "Canada Mortgage and Housing Corporation, housing starts, all areas, quarterly/Société canadienne d'hypothèques et de logement, mises en chantier de logements, toutes régions, trimestriel") {
    graphElement = <HousingGraph language={language}/>;
    tableElement = <HousingTable language={language}/>;
  }

  // If no file is recognized, show error
  if (!graphElement && !tableElement) {
    return (
      <div className="main-content">
        <div className="error">
          File not recognized: {file ? file.name : 'No file selected'}
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <TableGraphButton activeView={visual} setVisual={setVisual} />
      {visual === "graph" ? graphElement : tableElement}
    </div>
  );
}

root.render(<App />);