

import React,{Component} from 'react';
import { connect } from 'dva';
import './teacherloading.css';
class TeacherLoading extends Component {

    render() {
        const { isShow } = this.props;
        return (
            <div className="cssload-thecube" style={ {display: (isShow?'block':'none') } }>
                <div className="cssload-cube cssload-c1"></div>
                <div className="cssload-cube cssload-c2"></div>
                <div className="cssload-cube cssload-c4"></div>
                <div className="cssload-cube cssload-c3"></div>
            </div>
            
        )
    }
}

export default connect(state=>{
    return {
        isShow:state.myloading.models.teacher
    }
})(TeacherLoading);