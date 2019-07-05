function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}


// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    percent: 0,
    show: true,
    imgUrls: [],
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: 'suger',
    author: '魔力红',
    src: 'https://zuozhaoxi.com/mp/Sugar.mp3',
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ],
    videosrc: "https://zuozhaoxi.com/mp/brkw.mp4",
    inputValue: '',
    flag: false
  },
  videoplay() {
    console.log("开始播放")
    if (!wx.getStorageSync("isPlay")) {
      this.videoContext.pause();
      this.showModal();
    }
  },
  videoplaying() {
    console.log("正在播放");
    if (!this.data.flag) {
      if (!wx.getStorageSync("isPlay")) {
        this.videoContext.pause();
        this.showModal();
      }
    }
  },

  showModal() {
    var that = this;
    wx.showModal({
      title: '警告!警告!',
      content: '正在使用移动流量是否继续',
      cancelText: "取消",
      confirmText: "继续",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '使用流量',
            icon: 'success',
            duration: 2000
          })
          that.videoContext.play();
          wx.setStorageSync("isPlay", true)
          that.setData({
            flag: true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '请连接wifi',
            icon: 'warn',
            duration: 2000
          })
          that.videoContext.pause();
          wx.setStorageSync("isPlay", false)
          that.setData({
            flag: false
          })

        }
      }
    })
  },

  bindInputBlur: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  bindSendDanmu: function() {
    console.log(this.data.inputValue)
    this.videoContext.sendDanmu({
      text: this.data.inputValue,
      color: getRandomColor()
    })
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function(res) {
        that.setData({
          Videosrc: res.tempFilePath
        })
      }
    })
  },

  audioPlay() {
    this.audioCtx.play();
  },
  audioPause: function() {
    this.audioCtx.pause()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var timer = setInterval(() => {
      if (this.data.percent < 100) {
        this.setData({
          percent: ++this.data.percent
        })
      } else {
        clearInterval(timer)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          show: !this.data.show
        })
      }
    }, 20)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.getNetworkType({
        success(res) {
          const networkType = res.networkType;
          console.log(networkType);
          wx.setStorageSync("isPlay", networkType == "wifi")
        }
      }),
      wx.onNetworkStatusChange(function(res) {
        console.log(res.isConnected)
        console.log(res.networkType)
        wx.setStorageSync("isPlay", res.networkType == "wifi");
        console.log(wx.getStorageSync("isPlay"))
      }),


      this.audioCtx = wx.createAudioContext('myAudio');
    this.videoContext = wx.createVideoContext('myVideo')

    wx.request({
      url: 'http://zuozhaoxi.com:3910/vue/getGoodList',
      data: {
        limit: 4
      },
      success: res => {
        console.log(res);
        this.setData({
          imgUrls: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})