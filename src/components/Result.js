import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";//tuika
import { postGrades } from "../api.js";//tuika
import { useEffect } from "react";//tuika

export function Result(props) {
    const time=parseInt(props.endTime-props.startTime);
    const hour=Math.floor(time/3600000);
    const minite=Math.floor((time%3600000)/60000);
    const second=Math.floor((time%3600000%60000)/1000);


    //kokokara
    const { isAuthenticated } = useAuth0();
    const { getAccessTokenWithPopup } = useAuth0();

    useEffect(() => {
        submitGrages();
      },[]); 

    function submitGrages() {
        if(isAuthenticated){
            const record = {
                score: props.correctCount,
                time: time,
              };
            postGrades(
                record,
                getAccessTokenWithPopup
            );
        }
    }

    const changeStr=(num)=>{
        let res=String(num);
        if(num<10) res='0'+res;
        return res;
    }
    //kokomadehennkou

    return (
        <div className="content">
            <div className="has-text-centered">
                <h1 className="is-1">Finish!!</h1>
                <div className="box">
                    <p>your score</p>
                    <h2>{props.correctCount}/15</h2>
                </div>
                <div className="box">
                    <p>your time</p>
                    <h2>{changeStr(hour)} : {changeStr(minite)} : {changeStr(second)}</h2>
                </div>
            </div>
            <div className="content has-text-right">
                <Link className="button is-danger" to="/ranking">
                    ランキングへ
                </Link>
            </div>
        </div>
    );
  }