# gp-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


文件目录结构说明
│  App.vue
│  main.js
│  main.less
│  tree.txt
│  
├─api
│      backpack.js
│      part.js
│      spread.js
│      user.js
│      
├─assets
│  │  bg.png
│  │  logo.png
│  │  
│  ├─coupon
│  │      1.png
│  │      2.png
│  │      3.png
│  │      4.png
│  │      use.png
│  │      zs.png
│  │      
│  ├─freeBox
│  │      freeBox_bg.png
│  │      freeBox_blue.png
│  │      freeBox_box.png
│  │      freeBox_guihong.png
│  │      freeBox_red.png
│  │      freeBox_side.png
│  │      freeBox_yellow.png
│  │      freeBox_zi.png
│  │      freeBox_zuanshi.png
│  │      
│  ├─header
│  │      exchange.png
│  │      freeOpen.png
│  │      header.png
│  │      LOGO.png
│  │      myBag.png
│  │      nine.png
│  │      question.png
│  │      roll.png
│  │      s-exchange.png
│  │      s-freeOpen.png
│  │      s-header.png
│  │      s-myBag.png
│  │      s-nine.png
│  │      s-question.png
│  │      s-roll.png
│  │      s-spread.png
│  │      spread.png
│  │      
│  ├─home
│  │  │  1.png
│  │  │  123.png
│  │  │  2.png
│  │  │  234.png
│  │  │  3.png
│  │  │  4.png
│  │  │  5.png
│  │  │  6.png
│  │  │  banner1.png
│  │  │  banner2.png
│  │  │  banner3.png
│  │  │  bg.png
│  │  │  box.png
│  │  │  box1.png
│  │  │  box2.png
│  │  │  box3.png
│  │  │  box4.png
│  │  │  box5.png
│  │  │  gun.png
│  │  │  
│  │  └─homeOpenBox
│  │          banner1.png
│  │          banner2.png
│  │          banner3.png
│  │          box.png
│  │          
│  ├─img
│  │      bg.png
│  │      bg_black.png
│  │      img_gouxuan.png
│  │      img_wx.png
│  │      img_zfb.png
│  │      img_zuanshi.png
│  │      img_zuanshizi.png
│  │      sudokuDetailsCard_bg.png
│  │      sudokuDetailsCard_gou.png
│  │      sudokuDetails_bg.png
│  │      sudoku_bg.png
│  │      sudoku_left.png
│  │      sudoku_right.png
│  │      tab_bg.png
│  │      
│  ├─left
│  │      bj.png
│  │      coupon.png
│  │      exit.png
│  │      invest.png
│  │      left.png
│  │      LOGO.png
│  │      loingout.png
│  │      myBag.png
│  │      see.png
│  │      service.png
│  │      setAccount.png
│  │      systemInfo.png
│  │      tip.png
│  │      welfare.png
│  │      zs.png
│  │      
│  ├─news
│  │      news.png
│  │      
│  ├─qiangbg
│  │      qiang_blue.png
│  │      qiang_guihong.png
│  │      qiang_red.png
│  │      qiang_yellow.png
│  │      qiang_zi.png
│  │      
│  ├─question
│  │      qs.png
│  │      qs_bg.png
│  │      
│  ├─roll
│  │      details_blue.png
│  │      details_guihong.png
│  │      details_huise.png
│  │      details_img.png
│  │      details_jianshu.png
│  │      details_left.png
│  │      details_qiang.png
│  │      details_red.png
│  │      details_renshu.png
│  │      details_right.png
│  │      details_show.png
│  │      details_winner.png
│  │      details_yellow.png
│  │      details_zise.png
│  │      roll_baomi.png
│  │      roll_bishou.png
│  │      roll_card.png
│  │      roll_details.png
│  │      roll_djs.png
│  │      roll_fanhui.png
│  │      roll_jianshu.png
│  │      roll_junji.png
│  │      roll_qiang.png
│  │      roll_qiang_bg.png
│  │      roll_renshu.png
│  │      roll_shouxian.png
│  │      roll_shuoming.png
│  │      roll_yinmi.png
│  │      roll_zongshu.png
│  │      roll_zuanshi.png
│  │      
│  └─welfare
│          wel0.png
│          wel1.png
│          wel2.png
│          wel3.png
│          wel4.png
│          wel5.png
│          wel6.png
│          
├─components
│  ├─common
│  │  │  index.js
│  │  │  
│  │  ├─button
│  │  │      gpBtn.vue
│  │  │      index.js
│  │  │      
│  │  ├─card
│  │  │      gpCard.vue
│  │  │      index.js
│  │  │      
│  │  ├─dialog
│  │  │      gpDialog.vue
│  │  │      index.js
│  │  │      
│  │  ├─icons
│  │  │      icons.vue
│  │  │      index.js
│  │  │      
│  │  ├─input
│  │  │      gpInput.vue
│  │  │      index.js
│  │  │      
│  │  ├─msg
│  │  │      msg.vue
│  │  │      
│  │  ├─pagination
│  │  │      gpPagination.vue
│  │  │      index.js
│  │  │      
│  │  ├─select
│  │  │      gpSelect.vue
│  │  │      index.js
│  │  │      
│  │  └─tabel
│  │          gpTable.vue
│  │          index.js
│  │          
│  ├─dropDownMenu
│  │      GpDropMenu.vue
│  │      
│  ├─elementUi
│  │      index.js
│  │      
│  ├─footer
│  │      index.vue
│  │      
│  ├─goodsCard
│  ├─header
│  │      index.vue
│  │      
│  ├─homeBanner
│  │      index.vue
│  │      
│  ├─layout
│  │      layout.vue
│  │      
│  ├─left
│  │      index.vue
│  │      
│  ├─localComponents
│  │  ├─goodsCard
│  │  │      goodsCard.vue
│  │  │      goodsCard_open.vue
│  │  │      
│  │  └─title
│  │          title.vue
│  │          
│  └─user
│          dialogInput.vue
│          forgotPassword.vue
│          login.vue
│          progress.vue
│          register.vue
│          
├─config
│      index.js
│      
├─directive
│  │  directives.js
│  │  index.js
│  │  
│  └─module
│          role.js
│          
├─libs
│      api.request.js
│      axios.js
│      regex.js
│      util.js
│      vue-expand.js
│      
├─plugin
│      index.js
│      
├─router
│      backpack.js
│      freeBoxRoute.js
│      help.js
│      index.js
│      leftRoute.js
│      otherRoute.js
│      rollRoute.js
│      route.js
│      sudoku.js
│      
├─store
│      index.js
│      userModules.js
│      
└─views
    │  Home.vue
    │  
    ├─asidePage
    │  ├─backpack
    │  │      backpack.vue
    │  │      backRecords.vue
    │  │      getBack.vue
    │  │      openRecords.vue
    │  │      pending.vue
    │  │      
    │  └─recharge
    │          index.vue
    │          
    ├─coupon
    │      index.vue
    │      
    ├─error
    │      404.vue
    │      
    ├─exchangeMall
    │      index.vue
    │      
    ├─freeBox
    │      index.vue
    │      
    ├─help
    │      help.vue
    │      
    ├─home
    │      index.vue
    │      openBoxList.vue
    │      
    ├─news
    │      index.vue
    │      
    ├─openCase
    │      openCase.vue
    │      
    ├─questions
    │      index.vue
    │      
    ├─roll
    │  │  detailsCard.vue
    │  │  
    │  ├─rollDuring
    │  │      awardShow.vue
    │  │      details.vue
    │  │      index.vue
    │  │      
    │  └─rollHome
    │          index.vue
    │          ROLLCard.vue
    │          ROLLList.vue
    │          
    ├─spread
    │      spread.vue
    │      
    ├─sudoku
    │      finished.vue
    │      index.vue
    │      ongoing.vue
    │      participate.vue
    │      sudokuCard.vue
    │      sudokuDetails.vue
    │      
    └─welfare
            index.vue
            welfareContent.vue