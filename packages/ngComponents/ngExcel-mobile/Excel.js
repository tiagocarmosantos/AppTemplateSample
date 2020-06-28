
  function inputFileHandler() {
    
    var callback =  function(data) {
      if (data && data.length > 0) {
        console.log(data)
        document.result = data

        var grouppedArray=_.groupBy(document.result, 'CODIGO')
        console.log(grouppedArray)

      }
    }
    
    excelToJSON(callback)

  }

  function excelToJSON(callback) {    

      var file = document.querySelector('input[type=file]').files[0] || event.target.files[0]

      var reader = new FileReader()
      reader.readAsBinaryString(file)

      reader.onload = function(fileObject) {

        var data = fileObject.target.result
        var workbook = XLSX.read(data, { type: 'binary' })

        workbook.SheetNames.forEach(function(sheetName) {
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])

           if (callback) callback(XL_row_object)
        })

      }

      reader.onerror = function(ex) {
        console.log(ex)
      }  

  }



