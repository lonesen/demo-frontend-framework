document.getElementById('dateButton').addEventListener('click', function() {

  document.getElementById('datetimeInput').style.display = 'block';
  
  
  document.getElementById('datetimeInput').addEventListener('input', function() {
  
    var selectedDateTime = document.getElementById('datetimeInput').value;
  
    // Gắn giá trị lên text của nút button
    document.getElementById('dateButton').innerHTML = '<i class="fa-solid fa-calendar-days"></i> ' + selectedDateTime;
  
    //  ngày-giờ
    document.getElementById('datetimeInput').style.display = 'none';
  });
  });