import React,{Component} from 'react';
import { connect } from 'dva';
import './loading.css';
class Loading extends Component {

    render() {
        const { isShow } = this.props;
        return (
            <div style={ {display: (isShow?'block':'none') } }>
                <div className="windows8"  >
                <div className="wBall" id="wBall_1">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_2">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_3">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_4">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_5">
                    <div className="wInnerBall"></div>
                </div>
            </div>
            </div>
            
        )
    }
}

export default connect(state=>{
    return {
        isShow:state.myloading.global
    }
})(Loading);