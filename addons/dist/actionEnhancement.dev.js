"use strict";

(function () {
  var VERSION = "0.1.0";

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text; // Avoid scrolling to bottom

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  function writeFile(path, content) {
    return regeneratorRuntime.async(function writeFile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = regeneratorRuntime;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch("http://music.163.com/betterncm_api/write_file?" + path, {
              body: content,
              method: "POST"
            }));

          case 3:
            _context.t1 = _context.sent.text();
            _context.next = 6;
            return _context.t0.awrap.call(_context.t0, _context.t1);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function openHtmlPage(html) {
    var identifier,
        _args2 = arguments;
    return regeneratorRuntime.async(function openHtmlPage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            identifier = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "usage";
            _context2.next = 3;
            return regeneratorRuntime.awrap(writeFile("/pluginData/actionEnhancement/".concat(identifier, ".html"), html));

          case 3:
            window.open("http://127.0.0.1:3297/pluginData/actionEnhancement/".concat(identifier, ".html"));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  setTimeout(function () {
    function getPlayingID() {
      return document.querySelector("*[data-res-action=opencomment]").dataset["resId"];
    }

    setInterval(function () {
      document.querySelector(".btn-dld").oncontextmenu = function (e) {
        fetch("https://music.163.com/betterncm_api/open?http://music.163.com/song/media/outer/url?id=".concat(getPlayingID(), ".mp3"));
        e.preventDefault();
      };

      document.querySelector(".btn-share").oncontextmenu = function (e) {
        copyTextToClipboard(getPlayingID());
        e.preventDefault();
      };
    }, 100);

    if (localStorage["cc.microblock.betterncm.plugin.actionEnhancement.lastUsedVer"] !== VERSION) {
      openHtmlPage("<script>document.write(decodeURI(\"%3Chtml%3E%3Ch1%3E%E8%BF%99%E4%BC%BC%E4%B9%8E%E6%98%AF%E4%BD%A0%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BD%BF%E7%94%A8Action%20Enhancement%E6%8F%92%E4%BB%B6%3C/h1%3E%3Cbr%3E%3Cspan%3EActionEnhancement%20v".concat(VERSION, "%3C/span%3E%3Cbr%3E%3Ch3%3E%E6%9C%AC%E6%8F%92%E4%BB%B6%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E5%8A%9F%E8%83%BD%E6%9C%89%3C/h3%3E%3Cbr%3E%3Cspan%3E1.%20%E5%8F%B3%E9%94%AE%E2%80%9C%E4%B8%8B%E8%BD%BD%E2%80%9D%E6%8C%89%E9%92%AE%E6%89%93%E5%BC%80%E6%AD%8C%E6%9B%B2mp3%E7%9B%B4%E9%93%BE%3C/span%3E%3Cbr%3E%3Cspan%3E2.%20%E5%8F%B3%E9%94%AE%E2%80%9C%E5%88%86%E4%BA%AB%E2%80%9D%E6%8C%89%E9%92%AE%E5%A4%8D%E5%88%B6%E6%AD%8C%E6%9B%B2%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90ID%EF%BC%88%E5%8F%AF%E7%94%A8%E4%BA%8E%E7%82%B9%E6%AD%8C%EF%BC%89%3C/span%3E%3C/html%3E\"))</script>"));
      localStorage["cc.microblock.betterncm.plugin.actionEnhancement.lastUsedVer"] = VERSION;
    }
  }, 100);
})();