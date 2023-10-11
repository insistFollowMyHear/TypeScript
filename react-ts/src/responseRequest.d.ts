declare namespace responseRequest {
  interface CourseItem {
    title: string;
    count: number;
  }
  
  interface DataStructure {
    [key: string]: CourseItem[];
  }

  type isLogin = Boolean;
  type login = Boolean;
  type logout = Boolean;
  type getData = Boolean;
  type showData = DataStructure;
  type showDataBoolean = Boolean; 
}