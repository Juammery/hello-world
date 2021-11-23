import $ from "jquery";
export default {
  install(Vue, options) {
    Vue.prototype.createImpl = function(
      canvas,
      a4Width,
      leftHeight,
      a4HeightRef,
      position,
      index,
      height,
      canvas1,
      pdf,
      title
    ) {
     if (leftHeight > 0) {
        index++;
        var checkCount = 0;
        if (leftHeight > a4HeightRef) {
          var i = position + a4HeightRef;
          for (i = position + a4HeightRef; i >= position; i--) {
            var isWrite = true;
            for (var j = 0; j < canvas.width; j++) {
              var c = canvas.getContext("2d").getImageData(j, i, 1, 1).data;

              if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                isWrite = false;
                break;
              }
            }
            if (isWrite) {
              checkCount++;
              if (checkCount >= 10) {
                break;
              }
            } else {
              checkCount = 0;
            }
          }
          height =
            Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
          if (height <= 0) {
            height = a4HeightRef;
          }
        } else {
          height = leftHeight;
        }

        canvas1.width = canvas.width;
        canvas1.height = height;

        // console.log(index, 'height:', height, 'pos', position);

        var ctx = canvas1.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          position,
          canvas.width,
          height,
          0,
          0,
          canvas.width,
          height
        );
        // var pageHeight = Math.round((a4Width / canvas.width) * height);
        // pdf.setPageSize(null, pageHeight)
        if (position != 0) {
          pdf.addPage();
        }
        pdf.addImage(
          canvas1.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          20,
          a4Width,
          (a4Width / canvas1.width) * height
        );
        leftHeight -= height;
        position += height;
        $(".pdfProgress").text(index + 1);
        $(".pdfTotal").text(index + Math.ceil(leftHeight / a4HeightRef));
        if (leftHeight > 0) {
          setTimeout(function() {
            Vue.prototype.createImpl(
              canvas,
              a4Width,
              leftHeight,
              a4HeightRef,
              position,
              index,
              height,
              canvas1,
              pdf,
              title
            );
          }, 500);
        } else {
          pdf.save(title + ".pdf");
        //   $(".pdfTip").remove();
        }
      }
    };
  }
};
