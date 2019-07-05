// components/photo/photo.js
Component({
  /**
   * 组件的属性列表   props 
   */
  properties: {
    msg: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    word: "Are you ok",
    src: "",
    newsrc: "",
    latitude: "",
    longitude: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    takePhoto() {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            newsrc: res.tempImagePath
          })
        }
      })
    },
    error(e) {
      console.log(e.detail)
    },
    changeCart() {
      var myEventDetail = { count: 1901 } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    startScan() {
      wx.scanCode({
        success(res) {
          console.log(res)
        }
      })
    },
    startPhoto() {
      console.log("startPhoto");
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          this.setData({
            src: tempFilePaths
          })
        }
      })
    },
    openmap() {
      wx.openLocation({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 18
      })
    },
    drawCanvas() {

    }
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.drawCanvas();
      var that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          that.setData({
            latitude,
            longitude
          })
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  }
})
