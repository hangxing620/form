<template>
  <div>
    <table-render :columns="columns" :data="data"></table-render>
  </div>
</template>

<script>
import TableRender from '../components/table-render/table.vue'

export default {
  components: {
    TableRender
  },
  data() {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '出生日期',
          key: 'birthday',
          render: (h, { row, column, index }) => {
            const date = new Date(parseInt(row.birthday))
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()

            const birthday = `${year}-${month}-${day}`

            return h('span', birthday)
          }
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          render: (h, { row, index}) => {
            if (this.eidtIndex === index) {
              return [
                h('button', {
                  on: {
                    click: () => {
                      this.data[index].name = this.editName
                      this.data[index].age = this.editAge
                      this.data[index].birthday = this.editBirthday
                      this.data[index].address = this.editAddress
                      this.eidtIndex = -1
                    }
                  }
                }, '保存'),
                h('button', {
                  style: {
                    marginLeft: '6px'
                  },
                  on: {
                    click: () => {
                      this.eidtIndex = -1
                    }
                  }
                }, '取消')
              ]
            } else {
              return h('button', {
                on: {
                  click: () => {
                    this.editName = row.name
                    this.editAge = row.age
                    this.editAddress = row.address
                    this.editBirthday = row.birthday
                    this.eidtIndex = index
                  }
                }
              }, '修改')
            }
          }
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ],
      editName: '',  // 第一列输入框
      editAge: '',  // 第二列输入框
      editBirthday: '',  // 第三列输入框
      editAddress: '',  // 第四列输入框
      eidtIndex: -1, // 当前聚集的输入框的行数
    }
  },
}
</script>