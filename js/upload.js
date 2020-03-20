'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var photosPreviewContainer = adForm.querySelector('.ad-form__photo-container');
  var photosPreview = photosPreviewContainer.querySelector('.ad-form__photo');

  var adFormAvatarReader = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var adFormPhotoReader = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var photoContainer = photosPreview.cloneNode(false);
      var photo = document.createElement('img');
      photo.style = 'display: block; width: 100%; height: 100%';
      photo.src = reader.result;
      photoContainer.appendChild(photo);
      photosPreviewContainer.appendChild(photoContainer);
    });

    reader.readAsDataURL(file);
  };

  var checkFile = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches ? matches : false;
  };

  var clearPhotosPreviewContainer = function () {
    avatarPreview.src = AVATAR_DEFAULT;
    photosPreviewContainer.querySelectorAll('.ad-form__photo').forEach(function (photo) {
      photo.remove();
    });
  };

  window.upload = {
    avatar: adFormAvatarReader,
    photo: adFormPhotoReader,
    check: checkFile,
    clear: clearPhotosPreviewContainer
  };
})();
