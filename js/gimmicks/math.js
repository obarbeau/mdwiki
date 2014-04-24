(function($) {
    'use strict';
    function load_mathjax() {
        // first insert configuration
        window.MathJax = {
            showProcessingMessages: false,
            tex2jax: {
                inlineMath: [ ['$$','$$']],
                displayMath: [ ['$$$','$$$']],
                processEscapes: true
            }
        };
        var url = $.md.prepareLink('cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML', { forceHTTP: true });
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function init() {
        var $math_sections = $('.lang-math');
        var num_math_sections = $math_sections.length;
        if (num_math_sections > 0) {
            // move the content of ```math out of a <pre><code> block so
            // mathjax will process it (mathjax by default ignores <pre>).
            $math_sections.each(function(index, section) {
                var $section = $(section);
                var text = '$$$' + $section.text() + '$$$';
                var div_for_mathjax = $('<div>' + text + '</div>');
                $section.parent('pre').replaceWith(div_for_mathjax);
            });

            // load mathjax script
            load_mathjax();
        }
    }

    var mathGimmick = new MDwiki.Core.Module();
    mathGimmick.init = function() {
        $.md.stage('gimmick').subscribe(function(done) {
            init();
            done();
        });
    };
    $.md.wiki.gimmicks.registerModule(mathGimmick);

}(jQuery));
