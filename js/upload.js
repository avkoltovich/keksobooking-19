'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var avatarChoose = adForm.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var photosChoose = adForm.querySelector('.ad-form__upload input[type=file]');
  var photosPreview = adForm.querySelector('.ad-form__photo');

  avatarChoose.addEventListener('change', function () {
    var file = avatarChoose.files[0];

    if (checkFiles(file, window.backend.error)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosChoose.addEventListener('change', function () {
    var file = photosChoose.files[0];

    if (checkFiles(file, window.backend.error)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photosPreview.style = 'display: flex; flex-wrap: wrap; width: 300px;';
        var photo = document.createElement('img');
        photo.classList.add('house-photo');
        photo.style = 'width: 70px; height: 70px; margin-right: 5px; margin-bottom: 5px';
        photo.src = reader.result;
        photosPreview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  });

  function checkFiles(file, ifError) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches ? matches : ifError('Выбранный файл не картинка');
  }

  function uploadRemove() {
    avatarPreview.src = AVATAR_DEFAULT;
    photosPreview.querySelectorAll('.house-photo').forEach(function (photo) {
      photo.remove();
    });
  }

  window.upload = {
    remove: uploadRemove
  };
})();
