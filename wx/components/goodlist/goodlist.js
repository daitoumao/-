// components/goodlist/goodlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    },
    goods: {
      type: Array
    }
  },
    attached: function () {
      console.log(this.properties.goods);
      console.log(this.properties.item)
      var data = this.properties.goods.filter(g => g.type.value == this.properties.item.value)
      console.log(data);
      this.setData({
        goodlist: data
      })
  },
  /**
   * 组件的初始数据
   */
  data: {
      goodlist: []

  },

  /**
   * 组件的方法列表
   */
  methods: {
    upper() {
      console.log("下拉刷新 -top");
      setTimeout(() => {
        this.setData({
            goodlist: this.data.goodlist.reverse()
        })
        wx.showToast({
          title: "下拉刷新成功!"
        })
      }, 1500)
    },
    lower() {
      console.log("上拉加载更多 -- down")
    },
    scroll() {
      console.log("正在滑动")
    }
  }
})