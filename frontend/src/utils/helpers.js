export function formatDate(dateStr) {
    // Expects 'YYYY-MM-DD', returns 'yyyymmdd'
    return dateStr.replace(/-/g, '');
  }
  