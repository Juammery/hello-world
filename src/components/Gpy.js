/* 成者高拍仪  by zhujiajian */
(function(w) {
  var _this, _testData, _callback;
  // 拍照文件
  w.bf = "";
  // 高拍仪对象
  _this = w.EP_HIGH = {};
  // 是否开启测试模式
  _this.testMode = false;
  // 测试数据
  _testData = _this.testData = {};
  // 打开高拍仪
  // param = {width : 639, height : 464, top : 260, left : 670}
  // 高拍仪位置param参数，width:宽, height:高, top:上, left:左
  _this.openGpy = function(param) {
    if (_this.testMode) {
      return {
        success: true
      };
    }
    try {
      var _result = EtOcxEx.CZUR_OpenetOcxWindow(
        param.width,
        param.height,
        param.top,
        param.left
      );
      var _resultObj = JSON.parse(_result);
      if (!_resultObj.success) {
        throw _resultObj.message;
      }
      //设置窗体
      _result = EtOcxEx.CZUR_SetWindowPosition(
        param.width,
        param.height,
        param.top,
        param.left
      );
      _resultObj = JSON.parse(_result);
      if (!_resultObj.success) {
        throw _resultObj.message;
      }
      //设置图片大小，500W像素
      _result = EtOcxEx.CZUR_SetResolution(2592, 1944);
      _resultObj = JSON.parse(_result);
      if (!_resultObj.success) {
        throw _resultObj.message;
      }

      return {
        success: true
      };
    } catch (e) {
      return _this.ajaxLog(e);
    }
  };

  // 高拍仪设置自动裁剪
  _this.tailorAutoGpy = function() {
    if (_this.testMode) {
      return {
        success: true
      };
    }
    try {
      EtOcxEx.CZUR_SetProcessType(2); //设置自动裁边
      return {
        success: true
      };
    } catch (e) {
      return _this.ajaxLog(e);
    }
  };

  // 关闭高拍仪
  _this.closeGpy = function() {
    if (_this.testMode) {
      return {
        success: true
      };
    }
    try {
      var _result = EtOcxEx.CZUR_CloseWindow();
      var _resultObj = JSON.parse(_result);
      if (!_resultObj.success) {
        throw _resultObj.message;
      }
      return {
        success: true
      };
    } catch (e) {
      return _this.ajaxLog(e);
    }
  };
  //关闭高拍仪 不写事件
  _this.closeHigh = function() {
    try {
      EtOcxEx.CZUR_CloseWindow(); //关闭高拍仪窗体
    } catch (e) {}
  };
  // 拍照
  _this.photo = function(fun) {
    _callback = fun;
    if (_this.testMode) {
      if (_callback) {
        _callback({
          success: true,
          message: _testData.message
        });
      }
      return {
        success: true
      };
    }
    try {
      var _result = EtOcxEx.CZUR_GrabSingleImage();
      var _resultObj = JSON.parse(_result);
      // alert('图片1' + JSON.stringify(_resultObj))
      if (!_resultObj.success) {
        throw _resultObj.message;
      }
      return {
        success: true
      };
    } catch (e) {
      return _this.ajaxLog(e);
    }
  };
  // 成者回调
  w.CZUR_CALLBACK = function(bsrFile1, bsrFile2) {
    w.bf = bsrFile1;
    // alert('我到回调了1' + 'bsrFile1')
    // 上传
    var r = LocalFileUtil.FileUpload(w.bf);
    // alert(EtOcxEx.CZUR_Base64(bsrFile1))
    var re = JSON.parse(r);
    var attaOid = re.attaOid;
    if (_callback) {
      _callback({
        success: true,
        message: attaOid
      });
    }
  };
  _this.CZUR_CALLBACK = w.CZUR_CALLBACK;
  // 隐藏高拍仪
  _this.hide = function() {
    if (_this.testMode) {
      return {
        success: true
      };
    }
    try {
      var _result = EtOcxEx.CZUR_HideWindow();
      var _resultObj = JSON.parse(_result);
      if (!_resultObj.success) {
        throw _resultObj.message;
      }
      return {
        success: true
      };
    } catch (e) {
      return _this.ajaxLog(e);
    }
  };
  // 展示高拍仪
  _this.show = function() {
    if (_this.testMode) {
      return {
        success: true
      };
    }
    try {
      var _result = EtOcxEx.CZUR_ShowWindow();
      var _resultObj = JSON.parse(_result);
      if (!_resultObj.success) {
        throw _resultObj.message;
      }
      return {
        success: true
      };
    } catch (e) {
      return _this.ajaxLog(e);
    }
  };
  _this.ajaxLog = function(e) {
    // $ && $.ajax({
    //     url : ctxPath + 'rest/terminal/runlog.do',
    //     data : {
    //         terminalCode : curTerminalCode,
    //         logLevel : 'ERROR',
    //         message : '高拍仪错误',
    //         detail : e
    //     },
    //     type : 'POST',
    //     dataType : 'json',
    //     success : null,
    //     error : null
    // });
    return {
      success: false,
      message: e
    };
  };
  _testData.message =
    "iVBORw0KGgoAAAANSUhEUgAAAF8AAABTCAIAAAB27EzZAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAgAElEQVR4nDS5R5NkaWIk9umnReiIjJSVWaJ19/SongEWgM3uwnCgMiN/Cs1oNB6W5IHGH8AfQOONBy6NuyAAYhezAxDAKExXd3V1l65KFRk64un3aR5mefeTm5u7mzscDdmDi/d+9KMvAKiDZn0WkbKsfvn188bon3z+4OK0//Vd9Vc//+rqdnNwHE8OgWrWEUi6wSmnoQ07q5xfvX6Fqtxn1jqsxZB5vJf6otpRY4BCpnV++P0/fvN2oY3HuVSaKG3yorpbLu6dn3366cd/8W//zU9+/P2DSX+7WQz7vTTpvnv77sWzl8P+oNPptNr89ssvOTDU91+/u2okH5wcx2nkx74y3GU4TWMr5ep2vr3baIv3dfXoo/vjSdjm+xdfPRtHkw4OL1e3N/vt8b2B5zlc6qP3HhZKzW93H977sNnVP//F33HLL947mw4SYuSuVcODo9MHD7lW+KDvO5QxYlT75ihW9zpOuV49f/luti6QCyrVvljWhaT96Wk86FWq2ed1UcF9aRWiwqB9WZdlTh3tdZwa8FI1lMI0iTzmWmE6Qf9k+qCXHBR7vssbP+xwrr/6+qky9tHD93/6Bz+9unx7fjh6/+HFbrMY9nvDfm+zXN1cvmMEr+9urJJxHDJKBRdpnE7HUynVoth3p+Pp/fMWorA3cN3QcEsBhUBEUQwshMakgQfqplztz6f3Dg+Pb1Z3tebdfk8J9e7dfLXdbLMcK/byybOnX33DXPq9L743nnbLegOsYNjtdLqL+eLls+ekG0fIiJt3r0fTEgxHdWONFq02O26u8nZ7s74tUX98Pj26mC9udrdzqaLITxBLOMBAQ89xg8RjDkqGYQBAWAnYCkoCbNUHn3zIrOvAuC3Mk8fPOtOj1XJNqTcejieT6eeffCrr9nh88PCwc3N7+fDe6fHpSV1W2+UKKOVTOn10UZbV49/8I0CONmCRFYS6P/viJzkvtMuUVKHr9ocDXpWlqDudwHW7i9l2NV8sbpWtMtNWLqKDbvr68tV8sxkdjQCkl5c3Qtiu67tRIjOzW22xBT/4/FMSsdeXL957cAIFB9zd3M5ulytpLD5I2Xa7K5sCuG3oEo95d3vxYtOWLLRhIiC0zJtMj6W217e3ZdVGST/u9F0/8D0/8IO6LC1SnXEUpkEQRJGfylrPrxefvPdJyOLV7b7fmSzmewDZbHHHW35xdn5xfvHg/r357Dr0aeDR/fxqPOh3+/1f/fpX/8e//j+/e/rtbrMJPS8KHEbxoDdwKOuknbKo1stlvdv9yQcPU0YYhmkSdfvJdrcwgBOmCWiW89V+W/FKISuBVr7jIIR/9fib2pi41ynLenGXR74zHI/rhi9vVqLi56eHH3324bbcTE8n08kw3++/+u1Xi8Xi5Ph0MZvjg463y6qKK+VY3wsAYld7fsvpSiCLseuwKPWB0bfXV/PZPIm6D+8/CqPAAh0mnuFqcTvrdZODo3GYJMN4EsLk7t1cVpqX0nDw7vU1hM4//e7rRshdtvqjf/YHZydHvuuIprx/dmhVM+iGB71ESvmb3/3u3/38F3lRRWE8Ggw7aeIwlMRJHCeEEs/z6qrEGGGjmsVNtdtBa32HGcWrcmtICynHpqkr3lSmrSXGKEr81Ta7W6+ENZaivOG7XW6l9Vwn6XTm61WVN0CZ0aBrkR0fH1w8vP/N11/vF2tk0XR6aI397ru3+HiUeHHHjyNNUOC6AJPM4hKFmjhp4J70Uz9A2W65mN2oVr3/4P2jw6O72fV6dctcJIqm3RcUo6gTMxac9M+Xrzb7de4ANh0e8kp6Tnh1PVPWYkbSyPmXP/vjpiou7h2Nh11o+cEwjX22XS2zrPzt46/mm32UdDzPDzxvPBwoyYXgvu9bCNu27nYSP/D6/S4kqOJ6tdrObxfZdtvpxRpwbdu62DS1NopxYeM09iJHQpn0U0qpwVgjVNcSaqCFWu+2yipGXd+hTVXczme1bBEm2BIXOWkalVX18uUbpTX+5L2z8eEh811jAcUAIGidwHqxFwSjyJt2Y0StEI0RCmgbe5GV4uk3/2RtHaYu5BI0vJOmjuczGrRr5Ui3rdvDyeF0PB32R1qb+Wq5z/KmrT9+7/zseDrq9zC02WZJsYkClu3WGKDFarPaZ16Y9Pp9a0E3TTBCFEFrbd00yiguWmuN47DD40MdRsgNgaUUO1VRei4ryn1R7rlstEKukxLquT7t9JOoGyEHYcSEsU0rFdcOIg5jAIFOrzcYjbQUdVlaZHdFzphzOJoCaZ6/fnp3d+e6XhRF+Ac/+gTjFtgtbzVEnoGu5/ccFlitlQXGDZWTKOgAC0W1E9XMiDti953YhHGDQc0gTNzk3uj+0B9BjYcHw6PpxPEYIZg5DCNkjfEdxyo57gTnp4fYKiPbtikJxnUryqrdZ9u006nbdr3cYID6nc7Jycluu86yPIziOE3SNHEdn2AGDH7z+roWYj5fSa13Wbbb7uqiPBsfrt7Oa+VSGlojEeLa5uNJEkZUioZAJ9vsZSOgARAR4vmAsNN7F8xnBlsndCmjFKPQ8U6Pj7979u28uPKTwAsipSFR0NZV7rpoNB1bxITSGkCHkpTGXMqq5kBp3RpMvCju1tlKATycHmFqQ9diwuoWuJhNukM/7JGpfzW7uru5zXb72WyGLNhut6Llk8kEaD3sDySXEsj5YnF3d/f9H3x/NlvkZT7ohFm+u7u9ORgPCHVGw+GLZ98V+92g3zPGWmvv7u6yrECQ+l5MCRWSBw5GkG5FdXY8Xa5mzNiQeJezTV7NkjgMA3e3KRlanV+cB47dlaUX+MogzyfMCTQEXhBMjsZ5vctLkPY7bVXlu02+3z7+7W9evngRTNwwTBkKKQL45HwgQeuEDouHLAil0TVvHNcdjYZpmlJMVCs0l0BboyxXtjeaxoPJrmgixjwSDaKDh2cfDvsH8/ny2YsXv/vyd69ePL9+9443jZLCaIUBMFqFYXB2emQBePrs+du37y7uP8iL8snXT6TgH77/qG3bpmkJY8CCVy9faNE+fHBxdHRU19XN7XVRlErpPC+zfVGUZRw6CBjFm24aGcUdBiPfPTqcfvPqUivQVK1VkGJvtynWy0xxgChyPM/xw6TXTfpdQGyU+m5AX75+vt1t+oNekefQaJfRwHWGg+7Zw/eAdRBgxb4mRbOLU7eVum7apOOxwG0Vl5oXxd4YUBW1qJuyqHjDq6ZiTuimU+g4gDZItgeD46P+mU/T5e3dZrl++vXXrZK+46ZhFEWRbHlZluvlylJmpBZSff30u6pu405vvc+efP21g9Fo0IUQFEXe8lYDtVqvoyh8/9GjNI6fP3+x3W1dl52eHdd12zTi5vou22effnQ+Gg0wIUqpzXbzl3/57whQYRj+4JOPru/mby+v66qKk0S0arva5HERjzzqBY4fA0Zv5rO6qQYo1at2s1lMJgcWmqqtU88nCAW+czAeO8ODN69+ef3uxihLegn1PLbdFwppx/MZJUpxxflqNRetJpBsV3OhtDbYQtwfT5POcLfftI2RwvaCXjdMdQObPM+329j3I4YZwGEQCCFm6zVvmtOT47auR6Pht8+eawsQdZbb/Hq2LOsauY4UvKyrq5ubsq6zijcNP794wJX++1/+UnLpOk6/318u10Ko5WJFsDs9PDo/PXvz9lVR5hf377suG457DZe//affXXz+0WIllZYAA0JVEBHBJWPAcx2NLHOdvG4RcwdJMBgkdzfvXEopQnXZHEyPQtepNmsAwOs3r/Vdtpqvm6YJHAf/6R+ddcJQCYvdruu6jEDJq91mpaQadPsE4+XysmrLIArP7z948PBhVeTvXj+v95t7SfLZow/7UafY5VVRS62Z52ulCQJScKD1oN/3GCvyDEO43W5aKZgXVlwKZTbbnUMxMurocAIIefbyZSstN3Y4PpjdLR8//mq13kohOt3uze3tZrfp9QfjybRuOGVsMh70B4OvnjyZL5caoldvrxD1tnmZFWs/8k4uDr3YMcDWbW2MmYy7jou5NBa5SWcYxonRuq0qAkDoOGVenZ7ej+OUEqdtagj0fD6vOWjaBiPruZgwWSBpIouLqr3Jr1wXYKy15IwA13Va0FoqPYckvWA46bTN/vbd82I16/j07GjqYLxezOa38/l8yw3iyioh750eIwgdx4nD8N2bt/k+a6t6PBnPtuvLmxvEgn2e+y6NiBu6jDH65vL6zfW8Pz6gbvDq7VVRllbpfje9ODnZ7TYIoY8/+lQpXRTFcDhSUl/eLBpelVy9ffnme98PWNQpW1VLOE0HcS8pjQ5ipGERauuwVgNDtJGtyKvlLpeT6RHDvut6QLfvvvs27vYYcZ98+yJNk6ZsBLFZVeXr1ho9HMUug6TcbWWb7wty2+wbyV0fdrqhllpDs1qthBRh4kdJB0E8m10Xu91mdkut6gShlXyxuC23ZVW2ABjecmlwkec3N9e8bRkh5/cuPM+7d3Latq0yum4abW1dFoPBkCJQ7FfvnT4cjw/+7su/EErfzuZlIxzHj5P0YDzGAKy32yQKzi/OALRFUcVJYjTiQl7NFrv9JivKslHfPH8Jibtc7jEmShHG0l//7X8olXBD9/z83n65lkJ4LjZKidbWxcphwajXbfabfH3HLPSJ8+rZy/nNHaXOdpvpprDKlIWOEswoHE+6+OHHH6+5XFRbabRom7YUFEVpPGLYlZJXTeF2xuPeMRKwrRoLgQYm8MPYDT84Pq6r5mo2r6WttTUIz+bztm1u765Go/7D+xf9TsdhrD8cUc8RSmsjgVaDNOnHoW7r89N79x++/9vH3zx789ZCDCw4nh524xBpRQAIGDnqdzqR2+8FUuTW8ul0MpvdSalr1RCHvr68goRoiy0ifhCGUVhl248+/OjV23eIEIBxd9DflzkNPSnxcrX1XCxFQ43xeOusl39075hitLyd7XdZ1YjRYNCUsi6M4oAgG/jk9P5B3E3xRx+/v83qrGoIJYS6TaMRcHr9UX8wwhi1QgCC26oq93sMrR/53X7Xpbjj+2f9wW69463sdgdRlFxd3mCErLHDXnIwGqVhjAEcjQ4AIsoA1/N5W7vM1UrVVTkZj/vD4S9/9as3b9+6vjsc9KMw8FxmjT4Yj6aTcb/boVYq2bz33v0XL7799JNPFvOly7y7u7nGiCvVcimlzooCQFTVTSeJE5f5YVg3rdS2aurFehlGwcFkslpkoq0RAm2rOJf5esek+vD+6bapF/t9LU0jbV4WddUoaayGCNqLB8dB4rx59xYfH4/W6wpCL+6ljuvnRVPWghCHUMqF5IKvdvPV3W22XkGonZAhZFyCqLEgq8a94dH0iECyWa7vZnOHUCMVUDXSetQb9rs91wujuBN3emmnV+53u+3WdRw/CACCT54+qduaOtQPPN9xrTEMk1F/4Pu+4O18frdbzo6ODtq2fPfu7U+++GIxXw76/d1ub6iz3e0BgNqaumq5VEJIhMAHF2fdbmeX58v1xgCAEDy7d4osfPH8rec4hKC6VhYTxlhTNpdXV1fbPfYc6LsSGEARAlBLiQwIIvdHX3xmoEjTlBRVDhFzPN9Cw6WQxmZlBa5vtNFpGkOLkJEUaMKw6yBoZZblu6YJNP7+Jz8t9vluvTUaWCEOB/2Xr95FcRIy2gkC3TZ1UfX6B53hGLp+KwW1Sgl1eXO9Lzaz+Z0y2gs9aKFHfYYhdVgnTfN8v6qboiys0ZM0LMvy6up15AeX7y6tUpvVUon6zc0KM6eqKopZJ00wwVJIl5AqL5Ik+eDBo9Uu29SFhlaUQkjpOH4SB8BKmcJWYi41prCAthS2z9jhybGb7YzFVtjV7abcVwQ7eZEpKARX+P6joVRQA1PUVZbnggtRt4ygs7OjOPSAVRZwqJWVfDQaUJdWVcGrcjockMpYqQa9vuE8CUNjrNIWWNCNo16n10l7B9PjKO15SepGcRBE/U4MIGyaep/njss63SQKA891A0o9RhnBdVXmu51WwvdcghFlmDnOdr8FEO13e2Ms5xxAqJHruJ6WajwclmX2waNHGNqLs1PZVFJKL4qLurm5u+NS5lnuB2F3OA4Dh2KrlDYAtVJBYBACFsOwk/pJmFc5c2i/22vLxhrbH8atLG5m18+ezfHFw2nN+T7f7/aZEtJ3HN+nk1Hn/Ufn40GaZ6umLeosg0r1+l3mu21b97vd2PHePX33wXvv7Tcbl5IoCFou91lxdHzS6XTGk2l/OEm6gyBJmOdjRjGlENrxZHxydjqdHvC2VZJLzl1GEs91CSUIIghcxiAEANhOJ2Wut1ptNru96/k31zNCaFXXQRAkvdF+u5NtE4f+e/fPl3e3D++dNWXe6yYGwEqI11fXRcO5VIhgylxAMW/KgCGCcN3yVihGKUFItDoIQwXUPt95nhMGAQHo888+MVa8evO2rJUFAL//4QctF3VdamU6STLsd0KfdFPveNoNXLhe3l7f3DZ5xRB2Pbdq681uO+j1Yi8IUeBi2lblZNwvi/Lq+oa5weHx2fToZDg+6PQHfpQQx0GMQowRxRYCxpjneWknGfS7DkZ1UdRlXu93ircAGEyQw5jrOYHnFUXx3YvXNZe9/nC7zQDEZV3GUfT+Rx8u17v9duswbCW/ODvBwMyu3h0djvKyIq774vJytlxrhPwoEkqWdVWqhiHdj/22qdarPaHUZcwoZTmA0ErdaqAoRRTj85NzhzlX128QEa4PHZfgzz//YVGV2qh+d3A4OYgjtyq3Tb0lUClRStlIRbVUFEKIYFEXxtp+pxs6fr2pBG8djHqdZH632O6Ki0fv33/vA+r4rh8y18eUIUKo62BGMEGQEEwIhABjGIfhsN8LXMdIFVDqOQxDjBBUUuZ5vlout5udE6WeH+z3ubHWABAG4cH04N3V5Wq1cx2meOtSGgWexyijmNcVC8Nnr99+8/wSMHx8fm96crJYLeq2ARgAzZGRVV5IDT0v0EooKT3kQYQwttJKbdSg1x/2x+/evJWy6g1STLCxEJ897O3rElJnkExc5u92++ViLjlvmjLL9lHSYd2HtZaWVI4vQ4eGzLcS7DZ71coyL8OoIxVtFe2MToLeqDs96vRHThAS14WEMdeFGGGEMYQAWYIgRBAACyGmDovTNApDrErZlEZwojUUkgk18KNBFEuoy2LvUuS5LiNEK71arZWyo9FxnHTW+23S7765vn57fbXc7qSF3716ebcpiB8lk8m9988Kvl2s7jC0IQTasrvMQLff6w6wNUbrouKtdXzf9z0Gka54G3VS3sq2aWgkFWghgRhBPJl4xlo/DIFq1svZejOXsjXaNK20hgRhz/HHrgNDRzGrfOxBRdaL/XKxItaKtgUaONQjjtfpj9LBKO32Xcd1HNfzfeYwYw1CCGMMIYSEIAgBAAAASgghJAziXq/bjYIgCBzHRQhTQjzHMVpzzjXQLiMMY4cgB+Mo9KPQ7/c6YRivN2uh5XKzBghsdhlGZLFcKYhGB8cFV07kxZ3wbnFbFaVDXWoB1yTqTfujA2vEfrPknPtRNL13JkXVFDvPw9TDXEjVql7SQ9gKobNdKbklDBFMHIxxkd+WdWasRAgZiwGghKVKew6vEgIaA4q8tQipxvKioQAFIb16uUo8TxlOtQcRxIRCSDw/xBhDRACEFlhjoTYAaICNNQBCCCBEGEEIIaQ2drqx92F3dHCeZ0W2V1IgANbL+e31VZHnxtqmbVvO8yrXRmrFkSC82Rb5arlap/1elKRGQ8Vl6MNwENfScNGius6yHQK2E8ebxR67DsQ47nQmhweXz1ebfXlyNPzke59bhP/++kWTcd8TcRRKa+piv9WIeZTYsNztKUX45OwQOkErTJVvpZQAIi54K3gQhkknlYpjXTmodm0dEiTKdrcrhJRx6p+cTLabXeDSsqiHwylzAjeMB6Ox73rGaGsthNAYAyH8/ynB1hprAYRAW+u4DnUcwihmDvOCpD/oDPrD8aQ36A4PJv3RkCnJ6woq5bu0E4ceox4jSrQ3dzMueBCHdSs4100liqwwyix263WWS2tbVQtda9kgY+u8xhhhL0Cu3x/2RZP5Dnj48FwD9e23j6Eof/Dh1GfWcylzXSUBxqRp+M3NrWhVt5PiwwcXlrjKYIacptFKW6mVgarbCzpdX8gM6QKIfeSjUZpmWbHZ1cCF4+Pu+dk9Am2+ryfDQ9cNDSRR2jmYHhNGIcIIE0KZBRBizFwXYcIYY5QRSiBESittDMIIQGQssgAbABEmBgLqeX4YhnGcel7g+QCCsiyVEAhYBIzVKkqiKE3yqr2Zr7lUTd3EYcibOuPSQGQJ8iLGHC2aHBnTltpxoRtFkDlNXRpRnk6HWovf/PZLy8v70+Qg8k1b+WGAmScsTLt9pVoAzXDUX2+WJIw72KGSy70wLLQ+VlIWvN0kiRfF2ALbZrW2wqlUQALmB1Ff0p4PYzZfbuvWYOw2rVyttolhnW4XYgwsBABAgCBACGIIILCQUooQxphADAAg1HWs1ZhgC4C22jKKAMEQMOMZLSEEHvH9Mxp2e9P798s8q/OsberdZl3Vpd9Lc67pt6+uFruiaFxCh4Muw2CzFHWrBVfp2O31mJGm3jWdCB5fjGvkQT8oi3rQjRgBT7761gh57150Pu6zpnHisIBIIAQJtYQK0zoBCRI/5inBugpxcLO7LQX0IzeJXVGTKpeMOVZaUQkJnboWxWa/WUitGQw64bhfyuzpt2+YIpETVqXYiXVvdNzp9hCGBlhrrTUAaPh7P9bWGAC01gghginCQBppAITAGmsBAdZYbSywCCKihEYQYQQlcVUQO65P/MgLE900SdzlbbMtt4vNer3aCKG0sUHkeT7bbRVzPQKEH9H+IB6NWehF+8U2W5aDnpNp3AKVjjuy2H379QurzIPTg/uHIa2bEMHu4OC6qjVyGkpaC7k1DvWKirt+SjzUtrutrlcceHHgMBdVWStaUeyhrmW2FSiILbRlw8u8BcD6NEAclAqOJyeTeHj75oa30hh0fHISxzFljCKitbbWGmsxAAghY7TgnDFKCIEQAgwxYhBohJAxChj1+yAzFmiAEHEIxForgYkkDkYUWOQAKCyKMNHaOtTxXF8KhSDkQk2mE+rQuimb1jDGHjy856eyKufjTq9zMnzNW4J1x4+2jeF1dvPuTZm3k3GXt225U/V+9/HnP6COc5WXDefpwVgi92CYLu7WRSkJ8QhkW9XsESo8ioja22znlOuAAo+Rfd1iN0QIGcr8UR+1AmuMDGiWkvr9//Ff/c9qV/yr/+a/q5q2dzg+fPRAI9z3QwipNEoqZYCGBEMAoLUEG6GVlsBg6FIPAIsAVEIpqRmwEBhlDaJIW2WhtVorLommVltlFMTYMEhiZprGli0Lqq5NfI+ItgUAVE1ZNnkBjEDWdx2/k7TyKizz8c7VYariTu/8C6vx4quvFrPbQdpxIMFuePl2Xr7hn3w8eicgUBoG/WM/QN14z9vs9U0x385rDaOQNE1WVDurpYMk32xcjD0NBr1h2O3b5WZbVq5DAWZKVq7LOiykJMBhtzX4q3/8zYPpiYtY4Ifn5/cnR4cUUogxII6DAwKNVsIaBYHVXEhlkQMwQQhDY5S1FiFEKaEUY2CEUdgawhgAgDeN1BoRSADEiBlEAbRWUaiUIgzv9y4KXGUoJXHoNJl48eKKOr/vUHgYBvNnL2naHI47RaP2RXZ49nAyPX/y5ddZlo/Hw04Spd3uZrcXmie94OD84dvtbtQfAUocN9zui11drFbrPKsbCbudDp4caNE0LmNVrkCrfcSssFJCrXHFFXNczIAGXCsee94wSRzq+kHQNG0K3K4Xfv34a8LoD//gpw/ee2SNjYMIO760RhkFEFJKIwu10kYbAxXGiJLfexEAwCJoEYIKGg2stAYgCKzFCFGMobWUIkQAxBZAK3lrpKKYKKV5WxHHy4vmdr7kQkipMEIWAG3M//Lf/w+nSfLVt1+umsoyj3r9ktOslE+/+cZ1aLeTLNeLu/ksL7MgdO6dnALH7U6Pe8Pxl4+/+frps11RGUzDOOkOj+ezzdHBISEYU98XXPKmMhJBBdpSVvU6TIukP+ymMXGaepchCByGymzHaw294na5/fHBo5vr6w/f/2BZ7E6OTxhjRprVakkovZ7dVFUdhIHDWCeMQtdzHSaRgEZp2WLAAARSSiWVsZa4DoTQKiWr1iFUS6W00VJUoBaSt3Xd1Fy13Eg97A4IcxB2XUo++vCTJ89f5WVrrBXKAATvHUz0bHZg4b3h9LleV0F/0DspN/WrZ88pIXES5mVRNjUk8PT4xHFcbEPlBP3DkzovXr67aWv56GA66I/jfldUlv/id6gxJPQ7nuvMF0vgNsz3LAlXu1UtAcT4aDzsTfqyWdKcuMxRUoiqRZbm2yXAWFlzcf+ik/auf/7v4yQmmDRVvbqdYVnN72br/VZIiRF2mXN2dHw0PUShCzFyHQcTTCl1HFe2ldWGCGEsaMuKQrSu6rIsMUJN22zFUgghOW+KmmIS+ZFVIvADaZGPndFofHF69u7dZRL4FRcNV4e9+Jtf/sPJaACM7R7e64yOb6+2Vy8v02H3/Y8+UFY/ffpEaHB673xyMAYW9MIDhfHrm9v1bO6EwXTa8RxXVNVMtE++fN5UzcvvnpNe/8j1vV1tfZuNx0d1De2m8Xw0mB6E3dALmIujKkw4L9abnaNBGLBo0I0dPxr0Th89ePbqL88eXBweHTVSXl/fvPjqK7u/E5Jv8iyvaqk1JuTN6+dpnARhMB6PR6NREAS9Xg8EAa9KrTSARDRtvt+3dbPb7S6vrzbbrTQ6B4XgXDbtIO124pgxN+10Dg8PMfWZ67oOnYz7o2Hv8nbGm+bw6PDP/uRfHLQiTlw7+3owPnSd9OXyWSVyvRKdH3//8uZ2l5VhlIymZ5hAl7Jepwcg7YYAACAASURBVPfm5t03T76qi2I86p8dTBer5W/+/uvctJqjfr9DECZxMgGUQLp1GAeIEEruXTyI/IgiKctdAxoHUwJoo6GUuqm5n/Z6kxH0o2jUA56zb6t7jx4AgreLpZKy3+uFSVC3tZrN1uXl9WJdthyCqzgM+hTdv3e2GY4ch8VxPBgMB4O+53mb3eL2+jrb7bMsW27Wt8v5arcVRmlg+mnn4vj4/ORkPBwwRqumLPKNG8EOShG2vkf7nTArvJrz//K/+M+++OxH+5ffbcUmB6oLKeRK6xZHAGr79OnTf/jl47iXxulwu60ZQefHvWq7psYcj0drBLLNkiehEWXgmJD6YTxy3Y6GkMTpUCKE2dyoBS8qLxiOTiZAm/3yWqtSWU68DqHOYDAe9XpNlllEs6YSXLZW3yzuLIIXDx8igjHGlJBe2ivm83/9b/763d1tMhltKlkL1TScZlVl6mK1jOJoOBy6rjeejH/84x/7jNZN/ubyZb7P6rq+Wy0X2bbWshYiZqGR5vLNu/X1LcFgMh1OphMvDNykD5CllExGwyQOA8/tdpM/+MkXTLJkNPi//urf56aFu50ri9BnecaPRpPry3dJJ/rhj34KEG6aut+flKWgRd6I6v69U9EU66vL5XKGKfrR9z/BCF7ebnZ13lhNrDFKa4sMcZBFnFGhxKbOqnK/7Yeh4aQCtcXU9TrHJ/fqqr68fLvZr1VbBRVo77K+lyRBoqTBhPWGg9uXb379zTdH5+ef/egH3U7y7TdPeFVx3k4nw8vXz7UyiDolFzAISadDul3USd18vV3cLWd3SmlgAbUIWQogzCyFwqqieHB0cHR0EDgk9MLhcILipFEGWeImveHB4bdPXxzFPtwsWffs23r788tvwDi9mb1OaKeoGlGo4D498A7+0+/9TCnyF3/1fx8eHyCKbuf7vQC94ThMu3Q06TQiSCJkagXawADX1NiYtlJks94YjCEAQRBqqbfbjTX7JmsAlzutgJKGwprrpD+mTmohXq7z7W7fDXwjZJ1XBFNrrLYWYOyH4dHJ6X/+Xw0wgpI3q7vZH//hH8q2rrJ9U9eh77meZzGmrhOkyenF/e7oIEpiZuTFex+Oxwcupa/fvg3q5uy9D1Z53ghrpfris+999/h3L7978cMffC9N+r4fs7gDKcGUIEyAsbrl3UG3XG/Gg/OX19eW0bSbBiHe3WVcCGtsVZWff/aHSej/b//r//767evt5u7Lx7/+5Hs/mF586AVEqhYi3EqeFSpygRM4ieuGGX01mxE3IevFyk+SQdrTxl2s10K2GGIFlFKcYmOUAhLu98VilV1dLyGhmMAkDd0gUAh6SZTdXAmpkNbM8TBxu2FHtPXd7KatpBeH+W5nCXaS2GASex5jjDhubzgIO92Te/fS/sDzXJ+g8w8/bbOdT0lvOM6qirjeoDsYdEedONlvt//sJz8FP/px3daun/ZHUxClnHNrVej51KKA0Yen93klWqXm6/XoYEr9eJnvxoPxQmoLeLWroBB/+9d/Xu/noYP2i9Xk7ODDDx7VGlX7XIiSSulDbXnFPFdz/XpxN1sVUhnZlGS32WGMkkFXojAKbb/HOOctrzVvWeC2RdEWTRLFXOHZctUq/dGnH77//sM6y97cvHvv4iFXMiuLJPQd1zNCQouwwyZHR/1RP9tukm4XWYuABQA2VdNwjiiLktj1AjdIqRspawHx0tEkg1jVOWKMCdHUDUYk366L7TZJEi+Kk04n7CSu7yFMJLTG2rYWsqnz7e54cvTjH3whhZEYSmDCKFnuM6AAIkgKEQVB4kUvvvlG1uW//JMf/t3/+5vLmlMIbi5fuV5/ebd89/pZ6Fsrt5QppMFivr+bN92e9+mnD7alIUYIXhUZlBy7QRQNRv3Z3Q1ACFDkhj6jxMGNH6StQkUrMG8HvbSbBvvV7ZvrN1E3wgTst+t0PNBaIIS1kJgRiCFAMOkjLYQSEmhFCHVD2YUYYQwRNsBi7GgNtdEEYETcznAEROwFoeLSYS6hrBECIOgEvh/HXhhixjAmXEjFOSW0Ely1PNttzs/PwzCFhO14YRjabXZSasPh5ezKD+JOJ9hfrebZm25MTdvphDiLSBR588WV5TNkvfm7Wb9LP/t0mme3SrVSmCDFQdqllIUeIi4lhpeFzKXbT3sDTIi2GmDY6fe8KFJYMuRJaau60lrEkSea/X59Y3m2XMv1Zu55tK1zzSuMQkYwogRgCzDGGGOENXWRD4A1Whs/gMYCbYwFsOUcAAQBpJhhoxhziMNwGERpV7Sc1xwi7A0ZIhgzFznUIGwhVAD+/lBUSjV1U9Wlkmo0PQx7fer7T95+ucyXu/22bHS5EbHXPTo8vZldv3x2c3bMkggt5y/mdxWhjjatNKAX9988vy2L1nd0nIReMNhviuWGu91IWffx42cui0kcuFLuuKgECne7bV5t17s1oog5Xt3osqhkXmNMLQRpN6HEtuV6c1e2dbHPxK9+9YsAe+u7m5OzE2ItcS1GxBqIMcEEE0Ss0lobay2lkEBrjOFSaa0poUAboAyhBCmFlQEEKAhdP/DTQdOItuXGCkQpYg5AyGO/x2tpTNkIyau2qderpQCmOx4LhISxj58//u7lk21bVgVQOe2dT6/ezt/c3BBCTo4PH9z3dpvt7aI2zE/7qSL8+asns6va9RhmZFvkUUz3ZQupT93+8+e31U57rCRac60ahGVdlY0SdVtKKwghdcFlY8p93ouSOE0JZVLUGEoMGwS4Q3Svl/7mt7/64uPvG6kU563SqhW+G2DmQAIwxsgCgCkhwGiojZK8MUYDYyAAlBBrlJKSQACEBEoBjABAGkAJgRMlkEkra4QQRAghSDQE0kAhodDAmKaqBRdXV1e9Xv/i0UNAvNfX17/+6teNargAhEBM8d31Xa0l9VEYp3mR5yV3PXww7XQm76FOvCoX5HjiYKGFu89vbxeLnnZoEHegd7XcGUj/+b/4aT/p4eN7kcHaAAOxwlZoJatSqoYo4bhsMBjcG57d6xweQgKAKVPKY2JlC5jTrxV59eY1hEa28r37H0NNLETWGggMBAAYgyHEEEJgjBZKcGGFAZBLYwwCADLmeIxiBLTSZd0oaTDEGGGEoIWaMEgxRAggYDRvgFaSN1IKKYVq5W6zaqvs6vJlyXPssZvV8rfffvl88U5aiawmkDDqKMuZb1xXI4rKukbQc5ijdQlsYUWBGk60Zi5RwPhOiKVrKuQ5fsNLN+l9+ukn4/Fwl+9QLZTFDnMCbIXgmWxLIxopuec4w25vPBh200no9yGigtda1wSrtBf2x33iehVXm3zfilYJYZTRXDVtI1uuONdKKimA1dZoa7QFWhuwL4q6biyAnhsghKy1EEENoeP6lDLRCCuNURoYjayF0EBoIQQQWCFaKTiXbSvaRlacV4vZzdtXr13mP3j/A47g33/5uJUKAkIpQxAbABhjoef5LjNEJYPhdt9k28q1YP5y4dfViR8RACw0GkhpDG/B4jbfrSqMHN/zp4dT6jqr9Ypsdnnb0iCgWrXWaNd1tAHaKAfzprgrNjN33h0eHbRVUeyy4YE3PZl0RtNS4E2Je70UIQCsburSj1wjtTGGIew4DoQQIfT7CVVrrZUWXPBWhV7oOB5jDgDaWvD7pYcxBq1py4o3TUAJJggoAxGEEFgAEIQM4xYIyXnd1I0ouSzLfK+F7vcmXz19+zdfP9lDluVVmnoYMwqxIQ5BzHHhanPTG08CP1qs1lug7o2DR4d4mgzaFuyysiZuVtXLu+Lzh5/KRswX2QcHHyyK/Bc//1srVZkXxFpGmE8ZtTaPfY+5wWZbljl3UGslL7Y5JysE9pUoy7IU2qdu6oa95V22z4uk21Wq2WyXWb6mzNMIGWxqgCil/1EaEFprlVJSqt127zC/m/asAUAbjAACEBhDgFVGI20wRLzicRhRgIVUBhoLNDRWSinbtq2rtq15U26rdV5syjKPgvj5d6//8fWdf3HREBdi2u+P8rywzLWc7TfZZrGeTgej7sGXv32SbWo88Y4POrv9bLO9YU5c1HrVbksOuv3+dr/Py0Yqm3YOvLT3i7/9W4IQIZR0esPpdGR0W2Qlpsj3/aZVWkiHamNVEiiXlQiiwaDb6R5rDRrhrTfo9Zu8KHnkOhFC7baYz6+Hg4OqrSAhhDCttRCCUkoI0VpDCIG1bVGF/VALXpWV6zhJEiKrsEFGCVkWvGkphEora61R2gJjoTVKaylEW0nRVlWmBbdGVflmu56vVsuibGDsG8ZagA5OT5XPrdHrde5QaIXVUhupsbHvvnold/K9i4+/9+NPbmbf/fq7fS9hg25ESUQhfu/hKTT06W++brL2waOHo8nRk+ePP/z4EwBhXTcEU0ZdX0qjACXYiZI+YQEBmEIIKe6EzA+0dUPsJVWlkYYAdxYbuVi3UdI5Hnqk3r2+nW13Sy6q0I8sRhAhIQQAwHVdAMDvtSOEgErtl8tsvpjd3Q26ncnBME1DRqAs8tnltQLWcV3iuJzXlkCNIbEIAGCB0Vq3TS2auirzosiK3a7MyrJuSyUYMhqoYnO3qkuSV3mxKwqOYtAUFbFKC76+vZkkhz/+0z97+L0fvV5c/8M3ryuIL+69T4k3poyy7euXb7QBFxendda4of/8zWvmelqKVkgnSfD0dGisycvcANDp9eNOFyFMEHQpZgj6jPqh1yhyu2mWm7LXG3V7/armZdtOJoPIJ0222tzNKMD9zjBOEoghQsx1PYSQMcZaCwD4fUpRbZez2V/8+Z//P//2z61qR/1Ui1qU2YvHv/ubv/6rv/sPPy+r8uLRhRsHwEGAQGSgUcoqqZVAQGstq7LYbzayKiWXedPuBQ/Hg21dXM+u1ovbOisAQFLbPK9DL2jzrZHyh987+k/+7E+H44NNWf38H/7u6vYqDr3j4cEgSLPr9ZNvnmd5dXw4SuJISL4u9izw/MgXxggIkv6A1HUtNPd8dzg8iDtpKxVAtD8aU63qbFdnWcOdvLQ3txsviJkfaKAsaYIItm37ZnZZ3r2C0ORFNl/cpb2BG8UUGYwxIeQ/FmaEjDEQg8hzxr3Oz/7gpz/85EPB25ffPV2vZx5DMUSTbnpyOHn/s8/8wCUUa6C1BdhCIbjVihDS1FII3rZV05S2VsW+3BelQPZmOVvVpdEqwBZjHzO6yQqMHSm51PzD9/ufff4+9punT1/+/e9eFdKejvshQaEQptrUmxo0YnKYQmu++/aJVEoSpm5Bo8dRp+d5cSMV9mM3TjqHh0e93kBIsM9a6iWOn1DHF9pwgxYVurvLy3UeBoEbust8vVjeap6J4mqb7+f7Noi6sK0ncSgbGcUD5PmaIMiYG4aQYc4bq6WRbb5cvn717Ob2DaG6EfusWNzO3h1M+55ng8g9OD7AlFDGoigFAEOLAYatkspaQul2vSzyTZltbq9ey6LJ9rvVfpcbtDZQOB50kOPCJEyy/bYu68j3IJDbfSMsD9JOP+n/zd/8uq7hP//Zn+3XG8PbyWRiNEAcLrMtDJwGqLKuLQBBECKMNXF73SFD+Ovf/hMeTIbHJ6cHk4O2LrJsp7Sq6qIss7rKmiaHyPpupIqy2e0wNDWv1pu11Ypag6yyyKsb4Cjw/uGhKUtgcRD3oeeFSew41AKtRVvtN5v53atvn7787tuXL58rLSyQ2W51dnZMCIDIGi1fvnn15ePHm+0+jhPmuBhjaLVBxmjFMCmLXKsGA7Xfrd+9frmYrZbbTa218vz48Lh/dGihUqqusrYsKowAQlqp6uReMphEq+3tZraGyKUsKav2d19+2en6zGWv37zNd/ttU+KUht3QcxmGECOwz/N0eHh0eLy8mzsI4vMHF34Q7ne7Yn/LiPU9uri73q6uRbNv663mVYRQiBGSsq4brhRhzrA78kiwL8VqXq7fLv+n//q/Tax99c1TPwrjfteNUt9zXYaJVVevn3/7+J/Wtzcvnn5zfXnluo7SYrtZddIYWH03u5ZCIOrczZeuG+z3GQTAGoXh/9fDl8Xcel5nrXf8xj3vfz7z/x+f4yEeakwSEoLrTC1KpFR1cFEFSkhcQamKIBVtkAwdaKTeoLZpQ0JSUJoCooqU0lZVU0zBzuDUcR3nHJ9jn+Gf5z18+9vf/M5c/MC6WhframmtR+/7rGctUzclYbgdh6IuVFMeH+yls8lofHp8epxXUgPi7dbcuYPZPCkK46RRwgqslamqBhO7cW212+N1MwVoVhfPa0P3D8e33r6rjPZjVFR5WqTGGRcBiiki1ucErPI8lpX19ceepISdHB+tLi+Qaw9fqyo5Hp1alTAMUhRVOfM5GfbaBLkiz3ShIh5bSyZZkytEw77v9YwkSVoFKPj93/z3l9uD119+WYkm7EYs8gD73XYnZHDv9o1vv/jNMh1DU+ezJMsK5+x0MtaijsNgnkznkykGNC8a0ajpeOoRIps6z9N5Otnb3SybatDr+ow4LQ73d3/45ht7B/sn06SS1iLUXVqQlM2VKaW0RnmMcsxOTxKtzcVLq2EYJNOp1rrbGxAgt25tHR1nxlrqw8Ury4OlbhAFKCCKGxrTMKDUGmxMr9+14GrDhWzmacIpIucvX0jnGYDF0CBnlZAE8KA/HCwsBWFHSjJPnVAe5r1pBYp1LG07E2hJPOr94e99taXN8Z17r3zrW2mRK6ylFVVplgbdw53Nb7/45+n4tOV55TxXdRNFXUpwOwjbfuhh+r53vefZj/2kj73NO9t1UXNEOnGLEUIpGo1Ppag3t+6HjK4uDp1We7s73/v+q7tHR3klAPO8yB978olzl6/c3dkj3K+Loh9FrTgqy0wIXRbV9tYkmciL59eHg/PjyUnVKO4FzoJzRukyjr2oHUtsStV4IeUI8kk5aLUvXblSadNdPJemc6OFahoqpdBGYuQQj1rdIcZodHqaJDaII8ICQ5jmqkFeIYkLOEJggcySup4k/+F3f6ND6ShP7927c2tzGzxA2WiQjB59dHCytzs+3s2no16rrWqRzotkPEd2RhAGa62UcRD8ydbRK/2+0XpAW+3Qa5rK1UZKVZS5IXBwerKytvz6X32XO0spu3fnzmyWn44ag1EclIuD7qVz5wfnr4xz/Rff+q6ncdeLR8kkimIpnLUIrFvfuOxM+MYP7vUWXW9pydTBoKuyYpQX+c79/e4gZt0O4wy0I4QM29GjD79jNM+Oj05D6/e6g4V+R5UFnWczh1AQxcPF5cFwATkkVZym5Ztvp1kxLmrFWIxUraUxFFviQAtaVl/9nc//yDs2RHJkRXY4ORzLxlj8N69fWxtEoshHB3tNka4MhxcvXCxrfeFKi1AfZ2J6Op6OJ0Y0dZ7nSZYdzjxKrdCYIm2VwMZ6OLNNd3ngtePx4dHicLhz9+7K6rk0meVZZQBpi6yBfre72Bnoqvrwe9938fz6N77x9a037/UvXuwsRcn0rSDwrl5dV7re3n3z8saFlSuLSEcihe237q8OlqPzSw6U1A53+ufPX7Za7ty8nU6aG+rWSZZ1l5YW1lYHg+H4+HR7e5cao8JW1Bt0u4NVYfDh/v5klCVJqZxvUIDZoKorYoBigp0WZbHcjb78O//uifX1bHKk88nx0fbbW29VyDrM5kXdD6gTjRVly2dREBjr2t3+wsql4XAtyAWxgLSxUsmyNlKKsizSeZuQ7qAPDOe2MTGdmfq1O2+ezEa+z3Ujjg8PjXKibAI/IrKel8pzaqE7DCnXhB0enT79zvc+cuXqK999+fe+8adCn3p++NjjD+X56cJK2B4sRm0kjGGAyqpOJkk1FcO+3+nGQkoatfenB8nolEkzaHeKWd3tL7K4u7O7MxqdOuUWF5fJ+UurYbgw6F9M5uS1H9wZJfW8stoxBwSsNbJx2AA2YGuZJ9fOLfzFH/7XPicyHYUwOz46euXWzh99543KbytsZZmE3DpkhkvDrf09FoS9xcWybpZXF7nPKgKSIcWQIhD0Wuc3rlx+9OFLD19fu3aNtqLENAV2ikF7aWiQnU6n3WFXCIUdrZTZmyY28A1GDOHIwfufeXpp7XytLcLIcxbVxYOXL33o/R/c39rZvr+rFH7r7u40ax578j0G83R+6IyaHJ3OZ9m8UDOhE+NyQNmsnpycgpSXzi/4AU2ybO3claXBuaODg15vELS7frdLGYkRCbd2x5NpUzfGATIGKKVgLHIGrMHUm8+mndBrBfRrX/6Sq8smS1s+rWd5Mkr+5zdfypK6Im7Y962RSmKI2J3tbexAIXR3a+uRBx/C2GpTGhZmWeljWs7Tw529uqoYY5x53SCSSnQGnbjXWlxbmhUJ4nj14sqdu7ex0BqYR5gCV9TCOduO/UWPdjqdIG41UIIq4oBXqmbODoLgV37xF373P37tj//H/6IsOD6YvfS/X1tc7lCfzLPJZJq0uy0/dONZ6pTl7RAJAoYXZb21ebq4ONSWOoOxRflkcu36A4pxv92iPOwXFUxnVV1LANBaY0LOpGrOOWutFg0CV82T537q7/mUVHna67R0VWaz+ub3b15bWVm/slETIB6eHe55Vh0dHngeQwgO9g+vbqzPspnYrBYWl+P+YhTxvc2tbtzKRXrl6pVknrbbbY/TiETDxYFyOpepBmGxVKYRQpiiVqWM+8oCCCWdcY2Q59cf3NhYL8vijCSxxlhrMXKmKVQjn37XO2/cemv79HS5v2Bqvfn2fn+5ayUuSiPdXAkT+cTnrEpyI3BdGGSQEMHJsfD8+K9/cEOb12mAMWgrJdaM9BbXR9O6aQwj2BijtCIYW2OcMchaZ6wGFTLCnPm1Fz6LleiG3OMYgd6/f2/zrTcfWr+8ttgxqiqzWVNVdV6HrajXH8hGhnEQhv7J8VF/2I1bIWdUNMXtW28A6PH0FAf4jdtvRL2oquZ5lTSqKst5Vc2zbHaws1UXWVHXTVk3ZVNpVWmdV7XHfQ/Tj374g5fXL1dCIkr6wyFyTok64NxjBANaXl6+dOny3t7B7u6uVYZhr5Y+IX7oeQTbKKS9bltLW2RlIxVjnHuRtaRuRLffkrqsGjkY0OGwF8ehNYr47Yt1Yx0QLSpjlHNWa+Vxhp0948oJgzpLP/LB9z/7kR/j1vTiACMt6uL0aLueJ0ZkZZEUYj7Lk7IqlJCex5MkCUJfNA1lJAg8QomSglKsmirweTZP9w/3mM92DnaYx4gS3VbkUYy1Gh0c5NPp/taWEYL6QZmXnHHpLAkDA9gq04ta737qCUwp8Tzj0OLyYpllGODs4gbjlHt+f7j4sY/9xPrly6+++io2zOB2VUljVBx6GMMsyeZpHfhB1Al6gx6mUItKWeGHuN33Ll7snVtdyvO5VmJvdwcL5Zxz2GkEAM4RQqIwpJSeEeDgnFPSI/g9Tz1JrQ0YxqDBGW2bskqoj3jsS2wlckfTUTKfWVB7+7uNaPI87/b6VdXE7S4A0QYmk0RKbbSbJem5lXOT0YQilqeZbkR6OiEanLRFkhGDl/pLxwendS2MNWErDqKIUDJP5x5lnSiu6tLzuXPG86jv+wgDxmCsIYw656zTPnOqyZ567LGPfeDHfAc+96K4bR1LMtUo6kiwuLoyXF7q9uPhYtxfCodrcTzgaTXH1K2dW2t3onQ23d/baYo58VsXkFHISYScsRoBYIKxc85oo6QWDQLdi/2f/5nnY4ZaHmUEtK6myXh/825eVEfjbFSbV27e2R/POA84pq2Wn8xSz6e+5wOg2SxNZmkySRCgMIju391kmGqpp6Npt9Nz2gWMSiHzvOCen8yze5vbiHMvjKZZSinVxhmMa62LqibatYPob737b3Dfx5RhzuNWnE4Tj1NOCaLcEeIIpZwjBz73sTb33r67l04BAabMArNAe4OFxZUVPww8nxGGMIewzZWulVRGOmcowrIWDWPc8wOKAIHTRpUOUQeAAJxzgAAj5BAmhIBtfulfvnB+bZU0BQYgCKy1WZ7Vjbq/efzXNzY307nlAZCgDxFnXLsZ4dYYdevWbUJwHEa9Xr8sctnIyek0nSZrSyvEgYc8Xeu4FY+TlHMeIbR/+7ZzUDpQWdEIgShphZGUFmHkSm2tZT578Nr1VqslZUMIAa2NMUqp0GMIYQXgB6HFyDoTRS1Z6dXF4VNPPHr3O9+aV/Mw7Fvr1U0jdH6STC+cW+IINzqjvilFGndaBPwrq9e7rd7p9AbjXlnVWZYSr73inAECpq4QWISRdYApqkWBiamK6fOf+OlPPPecKiuHDA6os0oX+eFbd3bu3z85PHrk4esPX92gVsmy8H0edduNyEfTTDlcKdQbrlal2ts/ubh08dr6A7EfIqX3tzY3dw/Xzq0WTWOBJNm8rIUXRFleOcCdbm97Z9c6LJTxgzbGPPTD+ThpsuLRB6+97z3v5D6AFxQStXo9VedaFL7HLELAOKGcYEotAUsckFrq0pg394+FtMYYgjElGBxYA0rjqrYbD1xfv7qeZjMAyz1veW1tmqWj+Xg2K6pcGG1I0Flz4LTRASOYUOPcGYh2W+Fof+fHP/yB3/jlX9ZlFficexwThJwtJ+PXXv72rbfvBnEECKzVy4sLHmfGGNFUVZkSSmZZHbW7k2nKqPern33hE//gH1ZFhgGWFgbrG1cm45NJOi+lKhphnTXWKWOtAyGkNjbLC0LoaJJGUWwdTMYTp9UD65efeuLx5ZVF55QlTDrCKc2TMXUKIWwBa4QY5QSY1Q4RNpnNa22+8tU/2JvOMeUIIWuNNYZg4jFfCl3VEgAuXbpAKU3nqVSyrIu9w61pMuOMR1Hr8qVzFMAi5Kw1DRgArK1BCmLfm5+c/NSzH//1X/nXVTqPKEPKggNEwGrjMR8Ap41eHnSEtdoalRetMEDWNk0NOlBlGQS+aJpHHnro1174N2sLCze+/yqnbGV1JfC9usmXL1z4y5e/1xl0iee3Is8aUs1zPgAAB9hJREFUjYXM8zyKoqJuuB80QliAshZRAIQQ5dzGxsba2ppqai/gWhlCocoyJwQPuRESOMUEAyCHkHQ2nUxYGJ8cnRqMAaEz2p9zTgg5E5JjhKIw2N7an07G61cvEIgJ6Pn8FKC8sr6KDA9ZsLy6RJ2zCDlMEMLMWRdwaurGWPmvPvMvfvZTn0rGo4ixiFBjFSbEWqO1powZ6/ZOJpNGF2WlpDy3shR7POLUR74XrnI/39w/vHjpwud/+7c8jPe2t9evXJq3wyzPsjJjUTupGsMoCyMHUNQNIVjXzbyohLZa68XFhbyquR9Szhshrdbdbtf3PGeNH/rWOSM0WJ2W8+VuDNY6wJx5DiGttNROKOBx/OJL3/nP/+3ru8fH8cpFRoBSaq0922RRSgFAWRaddq+uxO2be2EL+kMOYKOYlcXc571Hn3qi244pwk5rBeAsEHAKW6ir7Mtf+tKHnnnfaH/PZ9RIKTHGiCppEEMOsHbA/FBZd/POXc8P2t3e3jgZxGFMUMsPpNTGoKjV/dy//RwjjFjTb4Wz8WnAOaH4rXv3D0an3791W4GbV41WqtuLjTFaKuJ5aZ5jjJUDi0gyT3zfZxiwtc5aJWolakXAUSaswkhiaxkGZ4yygI1zzjhsSiFY2P78F790Ms1O0nlvYbWxxlhnjDHGEEK01gghQkgriqQ0CCgY1xRirHPmK+4bz4vW16/2hku7O1vUOY0Qcg5rbZyURjY/9zPP/90P/OjoYD+gOE0mAaeEc04AMDHIWYKl0sOlpY8+88y0qm9u7dy8v0Uo1YhIj83KFAg+HJ/++q9+bmPjajYZE2RlWagiP5lNK2v9dnvn5pvTSlKMmdCBx7OiAgQIUNM0cRwLIYpGZGXteWEjVCHqy+dXsFNFnivZ4DiSzrXa7dFk1m2FdVNRjAzCUhtMUJlllUWy0ZOivLW15ZhXGYsQPjPOeVVVnHOMsdYKwCJECCbWOrC0yE2Pt5YXBn4QLC6uTiaZH7ap1ppSDg47LVt+aIx895NPnB7s+gSLpsYIjBbAGGDkCNLOIEJag55Gbvf2je7K2vUHNgT3f3jnbjMrU4+FBMtq/ulPffpvP/13ijIvsnkj6maWuKbJ5/O9yfTFV//q9bs7YStyFoQxSCIHijJKKUGECG2o5wMmBkHkBQ7cysoKODSfpWptmSKkZQNhOysLjWzUCk09b6SQGHGlUCNpGCPj9g+P37x3L2+EIx7Shjh3Nq1HCEVRdDbXBwCjFSGWIEAIEEIMgio122J+7ZF2FPRanQWpamqsYogjhJlDuhYeJnWRq6ay4BDCns+NqAHAWCOVdR5iFBuD3/H446/892+c7mydAD2Y14764AWZEPOq/uRzz376n/zjqiwREGft6PiIVqUTlTP6pZdeurV7HHWjWjtkXeD71ho/CgFBIwRj3DhHMZnNMyFUt+UFHg/jeKnfWb+4un5xzeOeVFIqkZTN6to5wqiHwhqhRqO0KLgD08hJLX7rC1/Iqwb7oTHEWMBnMIwxIeTsm/1/t1UBrFEIWYSJlIpgzxkoUpmljefFRV5v72+RoLUIFsBoBNqq+l1P/chP//2PWyU9z3cAhDIHDgiyCByyBCOCMCG4khLC+Pf/7M+Pq0YxqpzFxsg8+7nnn/+FX/znuqzUaIyytExGZTl32Lz25o0v/PGf3pskNA7zqvY9zinCzoI1OPTzuq7rhhBCKWYYI2OcURy7y+eWrl5e7cXe+XPLXhjkUtCoPa+bdqu1NBz63MeYMxYKaYVQirUPkuy3v/KfxllpMbZGEwQEWYwNBkDgnDUYMMWcYIYAa6swoQhhRDDCCGNsrEEEHR2Njo5O03R688ZrhHl9AAtgPYpFU370xz90/eq6xylC4KyllCKKgWKHwTqLMXDGMMXTNF06fznoDW7cv380nlitQevP/Ow//cw/+3lthErnapLUs6k0AvvsO6+9/uK3v3sqtMIYEHbOWSUZxYwQ5vGyaRxA4AcEYwIQBX5Tl4Nu5/GHr/fbkU/Bpxhh5BDwsIU9b5bMNq6sY0Q8LwTC88YoA6PJ7P5J+uWv/Ze90xNEubbWOUcQEHAIOwdGa62UwpgghBFC1tggChBC2pizpkMYObAYY8+PsyxLJqd1lVFADiGMkWuaenVp5UefftoYjTgVQlhrAWOMgeCzJwJGCIwxhNJev3e0d/KPPvnJjzz78d/84hdFI595z3uf+4mfVHnmVGPqpqmrvKwaUDc37734vdeOkhz7IXFWNI21hmIATIWx0ikA54xBlAW+R8Hl2TwOw2sPbAScxIEXBh4loLTGxjCKNu/dffDBh8A5yriwUCujmS8Nvn8y/soffL1WqtPp10Za5ZxzFoFDTkt1BjvWobopwVWMeUEQOGeNMdZaQoj5fzkCACklwqCU8YOYYowRcs6BEvL5559fW1vLpyOttdLqrNgAIbDgABBylDHrrHUujuP1jY3Dk+PWYOGFz/4SdhhrMz7c9RCyupZlIepGWnv/6PiH9/dwZ3ihs3x0uF9mhVWGEPA49zir6sZqFzLa6rSNkkoI4wwj+MqlC91W1PEwo9goWdWq3ekw5o1G08AP4rClpcOdQACmrfb2zv4f/cmfffPFv+R+RDjOipz7PiPUGOfcmYQIEDoTEwECQBghbI1VRrj/n5GzUMbYmUMJA2eN1v8HaPdURThM5L0AAAAASUVORK5CYII=";
})(window);
