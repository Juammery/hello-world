// 导出页面为PDF格式
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import $ from "jquery";
export default {
  install(Vue, options) {
    Vue.prototype.getPdf = function(dom, isTransverse) {
      var title = this.htmlTitle;
      html2Canvas(document.querySelector("#pdfDom"), {
        allowTaint: true,
        background: "#FFFFFF"
      }).then(function(canvas) {
        if (!isTransverse) {
          let leftHeight = canvas.height;
          let position = 0; //页面偏移
          let a4Width = 595.28;
          var a4Height = 841.89;
          var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height); //1页pdf显示html页面的高度
          let pageData = canvas.toDataURL("image/jpeg", 1.0);
          let pdf = new JsPDF("", "pt", "a4");
          var index = 1,
            canvas1 = document.createElement("canvas"),
            height;
          pdf.setDisplayMode("fullwidth", "continuous", "FullScreen");
          // $("pdfDom").append(
          //   $(
          //     '<div class="pdfTip">' +
          //       '   <div>正在生成第<span class="pdfProgress">1</span>页，共<span class="pdfTotal"></span>页...' +
          //       "</div>"
          //   )
          // );
          if (leftHeight < a4HeightRef) {
            pdf.addImage(
              pageData,
              "JPEG",
              0,
              20,
              a4Width,
              (a4Width / canvas.width) * leftHeight
            );
            pdf.save(title + ".pdf");
          } else {
            try {
              pdf.deletePage(0);
              // $(".pdfTip").show();
              // $(".pdfTotal").text(index + Math.ceil(leftHeight / a4HeightRef));
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
            } catch (err) {
              console.log(err);
            }
          }
          // PDF.save(title + ".pdf");
        } else {
          let contentWidth = canvas.width;
          let contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          let a4HeightRef = (contentWidth / 841.89) * 592.28;
          //未生成pdf的html页面高度
          let leftHeight = contentHeight;
          //页面偏移
          let position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let a4Width = 841.89;
          let pageData = canvas.toDataURL();
          let pdf = new JsPDF("l", "pt", "a4");
          index = 1;
          canvas1 = document.createElement("canvas");
          height = 0;
          pdf.setDisplayMode("fullwidth", "continuous", "FullScreen");
          if (leftHeight < a4HeightRef) {
            pdf.addImage(
              pageData,
              "JPEG",
              0,
              20,
              a4Width,
              (592.28 / canvas.width) * leftHeight
            );
            pdf.save(title + ".pdf");
          } else {
            try {
              pdf.deletePage(0);
              // $(".pdfTip").show();
              // $(".pdfTotal").text(index + Math.ceil(leftHeight / a4HeightRef));
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
            } catch (err) {
              console.log(err);
            }
          }
        }
      });
    };
  }
};
