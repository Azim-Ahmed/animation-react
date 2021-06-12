// import React, {useEffect, useState} from 'react';
// import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
// import { Button, ListItem } from 'react-native-elements';
// import { useSelector, useDispatch } from 'react-redux';
// import MainNav from "../Menus/MainNav";
// import { Loading } from '../Elements/LoadingComponent';
// import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
// import { Container, Content } from 'native-base';
// import { Icon } from 'react-native-elements';
// import colors from '../../assets/design/colors';
// import { fetchProjects } from '../../redux/features/projectsSlice';
// import { deleteProject } from '../../redux/features/projectsSlice';



// function deleteArrow () {
//   return(
//     <View>
//     <Icon
//     name='angle-left'
//     type='font-awesome'
//     color={colors.mandy}
//     size={20}
//     />
//     </View>
//   );
// }

// const RenderProject = ({ icon, projectId, projectName, navigation}) => {

//   return (
//       <ListItem
//         leftIcon={icon}
//         title={projectName}
//         bottomDivider
//         onPress={() => navigation.navigate("Project", { projectId })}
//       />
//   );
// }

// export default function MyProjects({ navigation }) {
//   // redux management
//   const { projects, loading, error } = useSelector((state) => state.projects);
//   const { id } = useSelector(state => state.users);
//   const [refreshing] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//   /** Fetches all of the projects that a student creates.
//    *  Using the current user's ID, we can fetch the projects
//    *  that is created under their user ID **/
//     dispatch(fetchProjects(id));
//   }, []);


//   if (loading) {
//     return <Loading />
//   } else {
//   return (
//       <Container>
//       <MainNav/>
//       <Button
//         title="Create Project"
//         buttonStyle={styles.buttonGreen}
//         onPress={() => navigation.navigate('CreateProject')}
//       />

// {/*Create the list of projects that the user created here*/ }
// <SwipeListView
//         keyExtractor={item => item.id}
//         data={projects}
//         refreshing={refreshing}
//         onRefresh={() => dispatch(fetchProjects(id))}
//         renderItem={({item}) => (

//         //When we have an item, create the row of that specific item (project)
//         <SwipeRow
//             leftOpenValue={90}
//             disableRightSwipe={false}
//             disableLeftSwipe={true}
//         >
//           <View style={styles.rowBack}>
//             <Icon
//               containerStyle={styles.trashButton}
//               name='trash'
//               type='font-awesome'
//               color={colors.white}
//               size={25}
//               onPress={() => dispatch(deleteProject(item.id, item.userId, navigation))}
//             />
//             <Icon //new edit button
//               containerStyle={styles.editButton}
//               name='edit'
//               type='font-awesome'
//               color={colors.white}
//               size={25}
//               onPress={() =>  navigation.navigate('UpdateProject', { passedProject: item })}  //this will call the new edit function editProject(item.id,)

//             />
//           </View>
//           <View>
//             <RenderProject
//               icon={deleteArrow}
//               projectId={item.id}
//               projectName={item.projectName}
//               navigation={navigation}
//             />
//           </View>
//         </SwipeRow>
//       )}
//     >
//     </SwipeListView>
//     </Container>
//   );
//   }
// }


// const styles = StyleSheet.create({
//   buttonPrimary: {
//     margin: 10,
//     backgroundColor: "#08547D"
//   },
//   buttonGreen: {
//     margin: 10,
//     backgroundColor: "#79B847"
//   },
//   rowBack: {
//     alignItems: 'center',
//     //backgroundColor: colors.monza,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     flex: 1,
//     marginLeft: 5,
//     marginVertical: 0,
//     width: 70,
//   },
//   trashButton: {
//     padding: 10,
//     backgroundColor: colors.monza,
//     margin: 0
//   },
//   editButton: {
//     padding: 10,
//     backgroundColor: colors.silverchalice,
//     margin: 0
//   },
// });