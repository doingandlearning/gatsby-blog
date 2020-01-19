import React from "react";
export function onRenderBody(
  { setPostBodyComponents }
) {
 setPostBodyComponents([
`<script>
(function() {
  var script = document.createElement('script');
  window.counter = 'https://kevincunningham_co_uk.goatcounter.com/count'
  script.async = 1;
  script.src = '//gc.zgo.at/count.js';

  var ins = document.getElementsByTagName('script')[0];
  ins.parentNode.insertBefore(script, ins)
})();
</script>`,
  ]);
}