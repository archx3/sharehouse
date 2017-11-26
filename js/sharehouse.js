(function ()
{
   let Bu = Barge.utils,
       Ba = Barge.Array,
       Bo = Barge.Object,
       Bs = Barge.String,
       Bd = Barge.Dom;

   let Be = new Barge.Event.EventManager(), body = document.body;

   let globalHost    = Bd.getEl(".global-host"),
       nav           = Bd.getEl(".menubar"),
       aboutDChevron = Bd.getEl(".about-d-chevron"),
       navBg = Bd.getEl(".nav-bg"),
       shlBg = Bd.getEl(".sh-bg"),
       menuItems     = Ba.toArray(Bd.getEl(".menubar .menu li"), true),
       containers    = Ba.toArray(Bd.getEl("section.container", true));

   let computedStyle = window.getComputedStyle;

   let tops = [];

   Ba.forEach(containers, function (container)
   {
      tops.push(container.offsetTop - 50);
   });

   console.log(tops);
   Be.bind(globalHost, "scroll", function (e)
   {
      let st = this.scrollTop,
          sh = this.scrollHeight;

      if (st > 80)
      {
         Bd.addClass(nav, "min");
      }
      else
      {
         Bd.removeClass(nav, "min");
      }

      if (st > tops[1] && st < tops[2])
      {
         Bd.setActive(menuItems[1], "active", "active")
      }
      else if (st > tops[2] && st < tops[3])
      {
         Bd.setActive(menuItems[2], "active", "active")
      }
      else if (st > tops[3])
      {
         Bd.setActive(menuItems[3], "active", "active")
      }
      else if (st < tops[1])
      {
         Bd.setActive(menuItems[0], "active", "active")
      }

   });

   let lastScrollTop = 0;
   navBg.style["opacity"] = 0;
   //console.log(op);
   Be.bind(globalHost, "scroll", function (e)
   {
      //console.log(e);
      //if(op < 1)
      //{
      //}
      //else
      //{
      //}

      //var st = window.pageYOffset || document.documentElement.scrollTop;
      // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      //console.log(st, lastScrollTop);
      //if (st > lastScrollTop){
         // downscroll code


      //} else {
         // upscroll code

      //}
      //lastScrollTop = st;
   });

   Be.bind(globalHost, "wheel", function (event)
   {
      let delta;
      let op = Bu.pFt(navBg.style["opacity"]);
      console.log(op);

      //if (st < 85)
      //{
      //
      //}

      if (event.wheelDelta)
      {
         delta = event.wheelDelta;
      }
      else {
         delta = -1 * event.deltaY;
      }

      if (delta < 0)
      {
         //console.log("DOWN");
         navBg.style["opacity"] = op + 0.1
      }
      else if (delta > 0)
      {
         //console.log("UP");
         navBg.style["opacity"] = op - 0.1

      }

   });

   let smoothScroll = function (scrollTo, duration = 20)
   {
      scrollTo = scrollTo > 0 ? scrollTo : 1;
      let scrollBy = (window.innerHeight / 100) * 2;

      console.log(scrollBy);

      let timer = window.setInterval(function ()
                                     {

                                        if (globalHost.scrollTop < scrollTo)
                                        {
                                           globalHost.scrollTop += scrollBy;
                                        }
                                        else if (globalHost.scrollTop > scrollTo)
                                        {
                                           globalHost.scrollTop -= scrollBy;
                                           if (globalHost.scrollTop === 1)
                                           {
                                              globalHost.scrollTop = 0
                                           }
                                        }

                                        if (globalHost.scrollTop === scrollTo || globalHost.scrollTop <= 0)
                                        {
                                           clearInterval(timer);
                                           return;
                                        }

                                     }, duration)
   };

   Be.bindOnAll(menuItems, "click", function (e)
   {
      let index = Ba.indexOf(menuItems, this);
      smoothScroll(tops[index] + 50, 3);
   });

   Be.bind(aboutDChevron, "click", function (e)
   {
      smoothScroll(tops[1] + 50, 3);
   });

   let tv = new TabbedView("#forms-parent",
                           {
                              1 : {
                                 containerID : "opform",
                                 tabName     : "Opreator",
                                 activeTab   : true
                              },
                              2 : {
                                 containerID : "depoform",
                                 tabName     : "Depositor"
                              }
                           },
                           {
                              defaultActiveTabNumber : 1,
                              //closeButtons           : true,
                              //canAddTab              : true,
                              //canRemoveTab           : true,
                              //showTabsList : true
                           })
}());