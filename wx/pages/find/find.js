// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [],
    goods: [],
    current: 0
  },
  changeSwiper(e){
    // console.log(e)
    this.setData({
      current:e.detail.current
    })
  },

  changeCurrent(e) {
    console.log(e);
    this.setData({
      current:e.target.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://zuozhaoxi.com:3910/vue/getGoodList',
      success: res => {
        console.log(res)
        this.setData({
          goods: res.data.result
        })
      }
    })
    wx.request({
      url: 'https://zuozhaoxi.com:3910/vue/getGoodTypes',
      success: res => {
        console.log(res)
        setTimeout(() => {
          this.setData({
            navs: res.data.result
          })
          wx.hideLoading();
          wx.showToast({
            title: '加载完成...',
          })
        }, 1000)

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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