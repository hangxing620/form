def merge(intervals):
    index = 0
    arrays = []
    intervals.sort(key=lambda x: x[0])
    def mergeArray(intervals, index): 
        # 终结条件
        if len(intervals) - 1 == index:
            return arrays

        # 处理当前层的逻辑
        if intervals[index][1] >= intervals[index + 1][0]:
            print('index+2', [intervals[index][0], intervals[index + 1][1]])
            arrays.append([intervals[index][0], intervals[index + 1][1]])
            index += 2
        else:
            print('index+1', intervals[index])
            arrays.append(intervals[index])
            index += 1
        
        if index > (len(intervals)):
          return arrays

        # 下探到下一层
        mergeArray(intervals, index)
    mergeArray(intervals, index)
    print(arrays)
    return arrays


merge([[1,4],[4,5]])