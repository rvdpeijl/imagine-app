Meteor.startup(function () {
	UploadServer.init({
		tmpDir: process.env.PWD + '/.uploads/tmp',
		uploadDir: process.env.PWD + '/public/33006923hGGrteo005PPwter4562agcs22/',
		checkCreateDirectories: true, //create the directories for you,
		getFileName: function(fileInfo, formData) {
			if (formData && formData._id !== null) {
				return formData._id + '.jpg';
			}
			return "";
		},
		finished: function(fileInfo, formData) {
			Members.update({
				_id: formData._id
			}, {
				$set: { hasPhoto: true }
			});
		}
	})
});