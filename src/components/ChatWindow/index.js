import './ChatWindow.css'
import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { MessageItem } from '../MessageItem';
import Api from '../../Api';

export const ChatWindow = ({user, data}) => {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() =>  {

        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId])

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list])
    
        
    const emojiClick = (e, emojiObject) => {
        setText( text + emojiObject.emoji )
    }

    const micClick = () => {
        if(recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = e => {
                setText( e.results[0][0].transcript )
            }

            
            recognition.start();

        }
    }

    const sendClick = () => {
        if(text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users)
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleInputKeyUp = e => e.keyCode == 13 ? sendClick() : ''

    const openEmoji = () => {
        setEmojiOpen(true)
    }

    const closeEmoji = () => {
        setEmojiOpen(false)
    }


    return (
        <div className='chatWindow'>
            <div className='chatWindow--header'>
                
                <div className='chatWindow--header-info'>
                    <img className='chatWindow--avatar' src={data.image} alt='' />
                    <div className='chatWindow--name'>{data.title}</div>
                </div>

                <div className='chatWindow--header-buttons'>

                    <div className='chatWindow--btn'>
                        <SearchIcon style={{color: '#919191'}}/>
                    </div>
                    <div className='chatWindow--btn'>
                        <AttachFileIcon style={{color: '#919191'}}/>
                    </div>
                    <div className='chatWindow--btn'>
                        <MoreVertIcon style={{color: '#919191'}}/>
                    </div>

                </div>

            </div>
            <div ref={body} className='chatWindow--body'>
                {list.map((item, key) => (
                    <MessageItem 
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div className='chatWindow--emoji-area' style={{height: emojiOpen ? '200px' : '0px'}}>
                <EmojiPicker 
                    onEmojiClick={emojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>
            <div className='chatWindow--footer'>

                <div className='chatWindow--pre'>
                    
                    {emojiOpen && 
                        <div className='chatWindow--btn' onClick={closeEmoji}>
                            <CloseIcon style={{color: '#919191'}}/>
                        </div>
                    }
                    {!emojiOpen && 
                        <div className='chatWindow--btn' onClick={openEmoji}>
                            <InsertEmoticonIcon style={{color: '#919191'}}/>
                        </div>
                    }

                    
                </div>
                <div className='chatWindow--input-area'>
                    <input 
                        className='chatWindow--input' 
                        type="text"
                        placeholder='Digite uma mensagem'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>    
                <div className='chatWindow--pos'>

                    {text === '' && 
                        <div 
                            className='chatWindow--btn'
                            onClick={micClick}
                        >
                            <MicIcon style={{color: listening ? '#126ECE': '#919191'}}/>
                        </div>
                    }
                    {text !== '' && 
                    <div 
                        className='chatWindow--btn'
                        onClick={sendClick}
                    >
                        <SendIcon style={{color: '#919191'}}/>
                    </div>
                    }
                
                </div>

            </div>
        </div>
    )
}