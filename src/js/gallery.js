$( document ).ready( galleryApp );

function galleryApp() {

  $( ".ga-Thumb" ).on( "click", clickOnThumbHandler );
  $( "body" ).on( "click", ".u-Modal", dismissModal );

  function clickOnThumbHandler() {
    var $thumb = $( this );
    var srcThumb = $thumb.find( "img" ).attr( "src" );
    var srcFullSized = srcThumb.replace( /thumbs/, "fullsize" );

    var $fullImage = $( '<img src="' + srcFullSized + '"">' );
    var $modal = $( ".u-Modal" );

    $modal.find( "figure" ).append( $fullImage );
    showModal();
  }

  function dismissModal() {
    var $modal = $( ".u-Modal" );

    $modal.find( "img" ).remove();
    $modal.hide();
  }

  function showModal() {
    $( ".u-Modal" ).css( "display", "flex" );
  }

}
