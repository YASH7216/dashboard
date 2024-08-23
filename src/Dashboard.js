import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import {
  Drawer, Box, Typography, Button, IconButton, Grid, Paper, TextField, Divider, Collapse
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import widgetsData from './widgetsData.json';

// Register the necessary Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [newWidgetInputs, setNewWidgetInputs] = useState({});
  const [categories, setCategories] = useState(widgetsData.categories);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleInputChange = (categoryId, value) => {
    setNewWidgetInputs({ ...newWidgetInputs, [categoryId]: value });
  };

  const handleAddWidget = (categoryId) => {
    const newWidget = newWidgetInputs[categoryId];
    if (newWidget) {
      const updatedCategories = categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [...category.widgets, { id: newWidget.toLowerCase().replace(/\s+/g, '-'), name: newWidget, content: '' }]
            }
          : category
      );
      setCategories(updatedCategories);
      setNewWidgetInputs({ ...newWidgetInputs, [categoryId]: '' });
    }
  };

  const handleRemoveWidget = (categoryId, widgetIndex) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? { ...category, widgets: category.widgets.filter((_, index) => index !== widgetIndex) }
        : category
    );
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    // Add logic for adding a new category
    const newCategoryId = `category-${categories.length + 1}`;
    const newCategory = {
      id: newCategoryId,
      name: `New Category ${categories.length + 1}`,
      widgets: []
    };
    setCategories([...categories, newCategory]);
  };

  const renderWidget = (widget) => {
    if (widget.id === 'cloud-accounts') {
      const data = {
        labels: ['Connected', 'Not Connected'],
        datasets: [
          {
            data: [2, 2],
            backgroundColor: ['#1e90ff', '#87cefa'], // Dark blue and light blue
            hoverBackgroundColor: ['#1e90ff', '#87cefa'],
          },
        ],
      };

      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };

      return (
        <Box sx={{ height: '250px' }}>
          <Doughnut data={data} options={options} />
        </Box>
      );
    }

    if (widget.id === 'cloud-risk-assessment') {
      const data = {
        labels: ['Failed', 'Warning', 'Not Available', 'Passed'],
        datasets: [
          {
            data: [1689, 681, 36, 7253], // The values for the categories
            backgroundColor: ['#ff4c4c', '#ffdd57', '#57a3ff', '#57ff57'], // Red, Yellow, Blue, Green
            hoverBackgroundColor: ['#ff4c4c', '#ffdd57', '#57a3ff', '#57ff57'],
          },
        ],
      };

      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };

      return (
        <Box sx={{ height: '250px' }}>
          <Doughnut data={data} options={options} />
        </Box>
      );
    }

    if (widget.type === 'donut') {
      return (
        <Box sx={{ height: '250px' }}>
          <Doughnut data={widget.data} options={widget.options} />
        </Box>
      );
    }

    return <Typography variant="body2">{widget.content}</Typography>;
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ marginBottom: 3 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleDrawerToggle} sx={{ marginRight: 2 }}>
          Add Widget
        </Button>
        <IconButton color="primary" sx={{ marginRight: 2 }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} sx={{ width: '40%' }}>
        <Box sx={{ width: '40vw', padding: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Personalize your dashboard</Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="subtitle1">Add the following widgets:</Typography>
          <Divider sx={{ marginY: 2 }} />

          {categories.map((category) => (
            <Box key={category.id} sx={{ marginBottom: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" onClick={() => handleCategoryToggle(category.id)} sx={{ cursor: 'pointer' }}>
                <Typography variant="h6">{category.name}</Typography>
                {expandedCategory === category.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
              <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
                <Box sx={{ marginTop: 1 }}>
                  {category.widgets && category.widgets.length > 0 ? (
                    category.widgets.map((widget, index) => (
                      <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }} key={widget.id}>
                        <Typography variant="body2" sx={{ marginRight: 2 }}>{widget.name}</Typography>
                        <IconButton color="error" onClick={() => handleRemoveWidget(category.id, index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                      No widgets available.
                    </Typography>
                  )}
                  <TextField
                    label={`Add a new widget to ${category.name}`}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={newWidgetInputs[category.id] || ''}
                    onChange={(e) => handleInputChange(category.id, e.target.value)}
                    sx={{ marginBottom: 1 }}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleAddWidget(category.id)}>
                    Add Widget
                  </Button>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Drawer>

      {categories.map((category) => (
        <div key={category.id}>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
            {category.name}
          </Typography>
          <Grid container spacing={2}>
            {category.widgets && category.widgets.length > 0 ? (
              category.widgets.map((widget) => (
                <Grid item xs={12} sm={6} md={4} key={widget.id}>
                  <Paper elevation={3} sx={{ padding: 2, height: '300px' }}>
                    <Typography variant="h6" component="div">
                      {widget.name}
                    </Typography>
                    {renderWidget(widget)}
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" sx={{ marginLeft: 2 }}>
                No widgets available.
              </Typography>
            )}

            {/* Add New Category Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleAddCategory}
              >
                <AddIcon style={{ fontSize: 40 }} />
                <Typography variant="h6" component="div" sx={{ marginLeft: 1 }}>
                  Add New Category
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      ))}
    </Box>
  );
};

export default Dashboard;
