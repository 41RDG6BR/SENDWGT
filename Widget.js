define([
  'dojo/_base/declare', 
  'jimu/BaseWidget', 
  'dojo/on',
  './modules/person/Person',
  'dojo/_base/lang'
],
function(
  declare, 
  BaseWidget, 
  on,
  Person,
  lang
) {

  return declare([BaseWidget], {

    baseClass: 'send-file',

    postCreate: function() {
      this.inherited(arguments);
      var imageFileEl = this.imageFile
      // var fileToUploadEl = this.fileToUpload
      var lblErrorEl = this.lblError
      var customBtnEl = this.customBtn
      var formEl = this.form

      var person = new Person("Rodrigo", 33, "Curitiba");
      var personJSON = JSON.stringify(person);
      alert(personJSON);
      var object = {  
        validExtension: function(file) {
          var allowedFiles = [".rar", ".zip"];
          var fileUpload = file

          var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
          if (!regex.test(fileUpload.value)) {
            lblErrorEl.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
            return false;
          } else {
            lblErrorEl.innerHTML = "";
            return true;
          }
        }
      };
    
      var isValid = object.validExtension.bind(object)

      on(imageFileEl, 'change', function() {
        if(isValid(imageFileEl)) {
          // fileToUploadEl.innerHTML = imageFileEl.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/[1])
        } else {
          // fileToUploadEl.innerHTML = "No file chosen, yet"
        }
      })

      on(customBtnEl, 'click', function(e) {
        var allowedFiles = [".rar", ".zip"];
        if(!isValid(imageFileEl)) {
          formEl.reset()
          e.preventDefault()
          lblErrorEl.innerHTML = "Please select files to upload having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
        }
      })
    },

    onClose: function(){
      var formEl = this.form
      formEl.reset()
      console.log('SendingFile::onClose');
    },

    // on(imageFileEl, "onProgress", function(data){
    //   console.warn("onProgress", data);
    //   dojo.byId("fileToUpload").value = "";
    //   dojo.forEach(data, function(d){
    //     dojo.byId("fileToUpload").value += "("+d.percent+"%) "+d.name+" \n";
    //   });
    // });
  
    // on(imageFileEl, "onComplete", function(data){
    //   console.warn("onComplete", data);
    //   dojo.forEach(data, function(d){
    //     dojo.byId("uploadedFiles").value += d.file+" \n";
    //     dojo.byId("rgtCol").innerHTML += imageHTML(d);//'<img src="'+d.file+'" />';
    //     rmFiles+=d.file+";";
    //   });
    // });
  });
});
