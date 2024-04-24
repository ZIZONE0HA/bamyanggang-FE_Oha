import "./NormalRoom.css";
import Button from "../common/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function NormalRoom ({roomList}) {

    const [isOnGame, setIsOnGame] = useState(roomList.isOnGame);
    const navigate = useNavigate();

    function handleJoinNormal(){
        if(isOnGame===1){
            alert("이미 게임 진행중 입니다");
        }
        else{
            const data = {
                userIdToken:'test',
                roomNm:roomList.roomNm,
                roomNo:roomList.roomNo,
            }
            axios.post('http://localhost:3001/dumi',data)
            .then(response => {
                console.log(response.data);
                const roomNo = response.data.roomNo
                navigate(`/gameReady/${roomNo}`)
            })
            .catch(error => {
                console.error('Error join game:', error);
            });
        }
    }

    return(
        <div className="normalRoomContainer">
            <div className="normalName">
                {roomList.roomNm}
            </div>
            <div className="normalPeople">
                <div className="peopleImg">
                    <img  className="peopleImg" src="images-jsx/party.png"/>
                </div>
                <div className="peopleCnt">
                    {roomList.joinCnt}명 참여중
                </div>
            </div>
            <div className="onGameBox">
                {roomList.isOnGame===0?
                (<span className="watingGameText">게임 대기 중</span>):
                (<span className="startGameText">게임 중</span>)}
            </div>
            <div className="normalTag">
                <img className="unlockImg" src="images-jsx/unlock.png"/>
                <div className="normalText">
                    Open Game
                </div>
            </div>
            <div className="joinButtonBox">    
                <Button
                    type="joinButton"
                    text="Join"
                    onClick={handleJoinNormal}
                />
            </div>
        </div>
    );
}

export default NormalRoom;