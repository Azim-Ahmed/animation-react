// import React, { useEffect, useState } from 'react';
// import SockJsClient from 'react-stomp';
// import './App.css';
// // import Button from '@material-ui/core/Button';
// import './MessageStyle.css';
// import { useSelector } from 'react-redux';
// // import debounce from 'lodash.debounce';
// import {BACKEND_WEBSOCKET_URL} from '../../urlConfig'
// const WebSocks = (props) => {
//   const user = useSelector((state) => state.auth);

//   const [visible, setVisible] = useState(false);
//   const [refData, setRefData] = useState(null);
//   const { name, organizationId, id } = user?.user;
//   const { elements, setPendingRequest, pendingRequest } = props;

//   // const newData = {
//   //   userId: id,
//   //   organizationId: organizationId,
//   //   messageContent: elements,
//   // };
//   // const deboundSendMessage = debounce(() => {
//   //   if (refData && pendingRequest) {
//   //     console.log('-------------------', newData);
//   //     refData.sendMessage('/app/organization', JSON.stringify(newData));
//   //   }
//   // }, 500);

//   const sendMessage = () => {
//     if (pendingRequest) {
//       refData.sendMessage(
//         '/app/organization',
//         JSON.stringify({
//           userId: id,
//           organizationId: organizationId,
//           messageContent: elements,
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     // deboundSendMessage();
//     sendMessage();
//     setPendingRequest(false);
//     // return deboundSendMessage.cancel;
//   }, [pendingRequest]);

//   return (
//     <div>
//       <div className='align-center'>
//         <h1>Visibility : {visible ? 'Connected ' : 'Disconnected'} Sockets </h1>{' '}
//       </div>
//       <div className='align-center'>
//         User : <p className='title1'> {name}</p>
//       </div>

//       <SockJsClient
//         url={BACKEND_WEBSOCKET_URL+"/push-message-mapping/"}
//         topics={['/topic/content']}
//         onConnect={() => {
//           setVisible(true);
//           console.log('connected');
//         }}
//         onDisconnect={() => {
//           setVisible(false);
//           console.log('Disconnected');
//         }}
//         onMessage={(msg) => {
//           props.setElements(msg.messageContent);
//           console.log(msg);
//         }}
//         ref={(client) => {
//           setRefData(client);
//         }}
//       />
//     </div>
//   );
// };

// export default WebSocks;
