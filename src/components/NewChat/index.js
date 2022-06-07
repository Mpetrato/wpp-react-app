import './NewChat.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useState, useEffect } from 'react';

import Api from '../../Api'

export const NewChat = ({user, chatlist, show, setShow}) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if(user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results) 
            }
        }
        getList();
    }, [user])

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

        btnClose();
    }

    const btnClose = () => {
        setShow(false)
    }

    return (
        <div className='newChat'  style={{left: show ? 0 : -415}}>
            <div className='newChat--head'>
                <div onClick={btnClose} className='newChat--back-button'>
                    <ArrowBackIcon style={{color: '#FFFFFF'}}/>
                </div>
                <div className='newChat--head-title'>Nova Conversa</div>
            </div>
            <div className='newChat--list'>
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className='newChat--item' key={key} > 
                        <img className='newChat--item-avatar' src={item.avatar} alt=''/>
                        <div className='newChat--item-name'>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}