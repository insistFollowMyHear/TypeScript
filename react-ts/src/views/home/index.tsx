import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import request from '../../request';
import './style.css';

interface CourseItem {
  title: string;
  count: number;
}

interface DataStructure {
  [key: string]: CourseItem[];
}

interface State {
  isLogin: boolean;
  loaded: boolean;
  data: DataStructure;
}

class Home extends Component {
  state: State = {
    isLogin: true,
    loaded: false, // 页面是否加载过
    data: {}
  }
  // constructor(props: any) {
  //   super(props);
  //   // 绑定this
  //   this.handleLogoutClick = this.handleLogoutClick.bind(this);
  // }
  componentDidMount(): void {
    request.get('/api/isLogin').then(res => {
      const data: Boolean = res.data;
      if (!data) {
        this.setState({
          isLogin: false
        })
      } else {
        this.setState({
          loaded: true
        })
      }
    })

    if (this.state.isLogin) {
      request.get('/api/showData').then(res => {
        const data: DataStructure = res.data;
        if (data) {
          this.setState({
            data
          })
        } else {
          message.success('获取数据失败');
        }
      })
    }
  }

  handleLogoutClick: () => void = () => {
    request.get('/api/logout').then(res => {
      const data: Boolean = res.data;
      if (data) {
        this.setState({
          isLogin: false
        })
      } else {
        message.error('退出失败');
      }
    })
  }

  handleGetDataClick: () => void = () => {
    request.get('/api/getData').then(res => {
      const data: Boolean = res.data;
      if (data) {
        message.success('爬取成功');
      } else {
        message.error('爬取失败');
      }
    })
  }

  getOption: () => echarts.EChartsOption = () => {
    const { data } = this.state;
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for(let key in data) {
      const item = data[key];
      times.push(key);
      item.forEach(innerItem => {
        const { title, count } = innerItem;
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title] ? tempData[title].push(innerItem.count) : tempData[title] = [count];
      })
    }
    const result: any[] = [];   
    for(let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      })
    }
    return {
      title: {
        text: '课程在线学习人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: courseNames
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: 'value'
      },
      series: result
    };
  }

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="btns">
              <Button type="primary" onClick={this.handleGetDataClick}>爬取</Button>
              <Button type="primary" onClick={this.handleLogoutClick}>退出</Button>
            </div>
            <ReactECharts option={this.getOption()} />
          </div>
        )
      } else {
        return null;
      }
    }
    return <Navigate to="/login" />
  }
}

export default Home;