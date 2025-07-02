let settings = {
  darkMode: false,
}

function getPref(type) {
  try {
    let curr = localStorage.getItem('settings');
    if (curr == null) {
      localStorage.setItem('settings', JSON.stringify(settings));
      return settings[type];
    }
    curr = JSON.parse(curr);
    return curr[type];
  } catch (error) {
    console.error('Error reading preferences:', error);
    return settings[type]; // fallback to default
  }
}

function setPref(type, value) {
  try {
    let curr = localStorage.getItem('settings');
    curr = curr ? JSON.parse(curr) : settings;
    curr[type] = value;
    localStorage.setItem('settings', JSON.stringify(curr));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
}

export {getPref,setPref};