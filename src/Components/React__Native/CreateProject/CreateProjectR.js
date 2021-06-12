// import React, {useState} from 'react';
// import {
//   Text,
//   TextInput,
//   View,
//   Switch,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {Button} from 'react-native-elements';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {useDispatch, useSelector} from 'react-redux';
// import {createProject, createProjectTemp} from '../../redux/features/projectsSlice';
// import {states} from '../../constants/statesUSA';
// import {screenWidth, screenHeight, statusBarHeight} from '../../constants/dimensions';
// import * as yup from 'yup';
// import {Formik} from 'formik';
// import {skills} from '../../constants/skills';
// import OverlaySearch from '../Reusable/OverlaySearch';
// import colors from '../../assets/design/colors';

// //Profanity test import
// import {ProfanityTest} from '../../profanityTest/Profanitytest';


// export default function CreateProject({ navigation }) {

//   const dispatch = useDispatch();

//   const { isNewUser, id: userId, projectCreator } = useSelector(state => state.users)
//   const [isRemote, setIsRemote] = useState(false);
//   const [isExpired, setIsExpired] = useState(false);
//   const [isClosed, setIsClosed] = useState(false);
//   const { loading, error } = useSelector(state => state.opportunities)

//   const [skillSearchVisible, setSkillSearchVisible] = useState(false)
//   const [showStartDate, setShowStartDate] = useState(false);
//   const [showEndDate, setShowEndDate] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   const initialValues = {
//     projectName: '',
//     city: '',
//     state: '',
//     country: '',
//     description: '',
//     skills: '',
//     expired: !isExpired,
//     remote: !isRemote,
//     closed: !isClosed,
//   };


//   const today = new Date();
//   //Yup schema indicates the error cases that appears once a user enters an invalid input
//   const yupSchema = {
//     projectName: yup
//       .string()
//       .min(5, "Must be at least 5 characters")
//       .required("Project Name is a required field")
//       .test('Profanity Test', 'Your text contains profane language', function (
//         value,
//       ) {
//         if (typeof value != "undefined"){
//           return !ProfanityTest(value.toLowerCase())
//         }
//         else{
//            return true;
//         }
//       }),

//     remote: yup.boolean(),

//     city: yup
//       .string()
//       .min(3, "Must be at least 3 characters")
//       .required("City is a required field")
//       .test('Profanity Test', 'Your text contains profane language', function (
//         value,
//       ) {
//         if (typeof value != "undefined") {
//           return !ProfanityTest(value.toLowerCase())
//         }
//         else {
//           return true;
//         }
//       }),
//     state: yup
//       .string()
//       .min(2, "Must be at least 2 characters")
//       .max(20, "Must be at most 20 characters")
//       .required("State is a required field"),

//     country: yup
//       .string()
//       .min(2, "Must be at least 2 characters")
//       .required("Country is a required field")
//       .test('Profanity Test', 'Your text contains profane language', function (
//         value,
//       ) {
//         if (typeof value != "undefined") {
//           return !ProfanityTest(value.toLowerCase())
//         }
//         else {
//           return true;
//         }
//       }),
//     skills: yup
//       .string()
//       .min(1, "Must be at least 1 character")
//       .required("Skills is a required field")
//       .test('Profanity Test', 'Your text contains profane language', function (
//         value,
//       ) {
//         if (typeof value != "undefined"){
//           return !ProfanityTest(value.toLowerCase())
//         }
//         else{
//            return true;
//         }
//       }),

//     description: yup
//       .string()
//       .min(10, "Must be at least 10 characters")
//       .required("Description is a required field")
//       .test('Profanity Test', 'Your text contains profane language', function (
//         value,
//       ) {
//         if (typeof value != "undefined"){
//           return !ProfanityTest(value.toLowerCase())
//         }
//         else{
//            return true;
//         }
//       }),


//   };

//   /** Once a user clicks on the "save" button after creating
//    *  a project on the form, this function organizes all of
//    *  values to ensure that every field is counted for before
//    *  being sent to projectsSlice **/
//   const handleCreateProject = values => {

//     const {navigate} = navigation;

//     // Get all of the field values from the form
//     // and put it under one object
//     const project = {...values};

//     if(project.skills && project.skills != ""){
//       //convert coma separated string to array
//       project.skills = project.skills.split(',').map(skill => skill.replace(' ', ''))
//     }

//     project.expired = isExpired;
//     project.userId = userId;
//     project.closed = isClosed;

//     //if the project is not remote, then set the fields for the city and state
//     if(project.city && project.state != null){
//         project.city = project.city.trim();

//     }

//     dispatch(createProject(project, navigate));

//   }


//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView>
//         <ScrollView
//           contentContainerStyle={styles.scrollView}
//           keyboardDismissMode='on-drag'
//           keyboardShouldPersistTaps='always'
//         >

//           <Formik
//             initialValues={initialValues}
//             onSubmit={values => handleCreateProject(values)}
//             validationSchema={yup.object().shape(yupSchema)}
//           >

//             {({ values, handleChange, handleBlur, errors, setFieldValue, setFieldTouched, touched, isValid, handleSubmit }) => (

//               <>

//                 {/* Text input field for project */}
//                 <TextInput
//                   value = {values.projectName}
//                   onChangeText={handleChange('projectName')}

//                   placeholder='Project Title'
//                   placeholderTextColor={colors.silverchalice}
//                   style={styles.inputBox}
//                 />

//                 {/* Error message for the inputfield of Project Name */}
//                 {touched.projectName && errors.projectName &&
//                   <Text style={styles.inputErrorMsg}>{errors.projectName}</Text>
//                 }

//                 {/* Remote toggle of whether it is in-person or remote */}
//                 <View style={styles.toggleView}>
//                   <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
//                     <Text style={styles.text}> {`This is ${isRemote ? 'an' : 'a'}`} </Text>
//                     {
//                       (isRemote)
//                         ? <Text style={styles.toggleTextGreen}>In Person</Text>
//                         : <Text style={styles.toggleTextBlue}>Remote</Text>
//                     }
//                     <Text style={styles.text}> opportunity</Text>
//                   </View>
//                   <Switch
//                     trackColor="#767577"
//                     thumbColor="#08547D"
//                     ios_backgroundColor="#3e3e3e"
//                     onValueChange={previousState => {
//                       setIsRemote(!isRemote);
//                       setFieldValue('remote', isRemote);
//                       setFieldValue('city', '');
//                       setFieldValue('state', '');
//                     }
//                     }
//                     value={isRemote}
//                   />
//                 </View>

//               {/* Field to put information about the city */}
//                     <TextInput
//                       value={values.city}
//                       onChangeText={handleChange('city')}
//                       onBlur={() => setFieldTouched('city')}
//                       placeholder='City*'
//                       placeholderTextColor={colors.silverchalice}
//                       style={styles.inputBox}
//                     />


//                 { touched.city && errors.city &&
//                   (
//                     <Text style={styles.inputErrorMsg}>{errors.city}</Text>
//                   )
//                 }


//               {/* Field to put information about the state */}
//                    <TextInput
//                    style={styles.inputBox}
//                    value={values.state}
//                    onChangeText={handleChange('state')}
//                    onBlur={handleBlur('state')}//() => setFieldTouched('state')}
//                    placeholder="State*"
//                    placeholderTextColor={colors.silverchalice}
//                    className={errors.state && touched.state && "error"}
//                  />

//                 {touched.state && errors.state &&
//                   (
//                     <Text style={styles.inputErrorMsg}>{errors.state}</Text>
//                   )
//                 }

//                 {/* Choosing the country of the project */}
//                 <TextInput
//                   style={styles.inputBox}
//                   value={values.country}
//                   onChangeText={handleChange('country')}
//                   onBlur={handleBlur('country')}//() => setFieldTouched('country')}
//                   placeholder="Country*"
//                   placeholderTextColor={colors.silverchalice}
//                   className={errors.country && touched.country && "error"}
//                 />
//                 {touched.country && errors.country && (
//                   <Text style={styles.inputErrorMsg}>{errors.country}</Text>
//                 )}


//                 {/* Searching for the skills to put for the project */}
//                 <TouchableOpacity
//                   style={styles.inputBox}
//                   onPress={() => {
//                     setSkillSearchVisible(true)
//                   }}
//                   style={{ padding: 5 }}
//                 >
//                   {values.skills ?

//                     <Text style={styles.inputBox}>
//                       {values.skills}
//                     </Text>
//                     :
//                     <Text style={{ ...styles.inputBox, color: '#C7C7CD' }}>
//                       Set Skills*
//                   </Text>

//                   }
//                 </TouchableOpacity>

//                 {/* OverlaySearch to be able to choose from a list of skills field. */}
//                 <OverlaySearch
//                   listData={skills}
//                   selfVisible={skillSearchVisible}
//                   setSelfVisible={setSkillSearchVisible}
//                   setFieldValue={setFieldValue}
//                   fieldValueName={'skills'}
//                   clearButton={true}
//                   addButton={true}
//                   saveButton={true}
//                   arrayField
//                   fieldNameString="Skills"
//                   currentValue={values.skills}
//                 />
//                 {touched.skills && errors.skills &&
//                   <Text style={styles.inputErrorMsg}>{errors.skills}</Text>
//                 }


//                 {/* Text field on describing the project */}
//                 <TextInput
//                   multiline
//                   numberOfLines={4}
//                   style={styles.textBox}
//                   value={values.description}
//                   onChangeText={handleChange('description')}
//                   onBlur={handleBlur('description')}//() => setFieldTouched('about')}
//                   placeholder="What is the project about?*"
//                   placeholderTextColor={colors.silverchalice}
//                   className={errors.description && touched.description && "error"}
//                 />
//                 {touched.description && errors.description && (
//                   <Text style={styles.inputErrorMsg}>{errors.description}</Text>
//                 )}


//                 <View style={styles.buttonContainer}>

//                   <Button
//                     title="Save"
//                     disabled = {loading}
//                     buttonStyle={styles.button}
//                     onPress={handleSubmit}
//                     loading = {loading}
//                   />
//                 </View>

//               </>
//             )}
//           </Formik>


//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollView: {
//     width: screenWidth - 20,
//     marginVertical: statusBarHeight,
//     marginVertical: 20,
//     paddingTop: 10,
//     borderRadius: 0.1,
//     justifyContent: 'flex-start',
//     marginHorizontal: 10,
//     paddingHorizontal: 10,
//   },
//   inputBox: {
//     width: screenWidth - 50,
//     margin: 5,
//     marginTop: 10,
//     marginBottom: 20,
//     padding: 10,
//     fontSize: (screenHeight<700)? 12:16,
//     color: 'black',
//     borderColor: '#d3d3d3',
//     borderBottomWidth: 1,
//   },
// 	inputErrorMsg: {
// 		width: screenWidth - 50,
// 		color: colors.monza,
// 		textAlign: 'right',
// 		margin: 10,
// 		marginTop: 0,
// 		marginBottom: 20,
// 		padding: 1,
// 	},
//   toggleTextBlue: {
//     fontSize: (screenHeight<700)? 14:16,
//     fontWeight: 'bold',
//     top: -1,
//     color: '#08547D',
//   },
//   toggleTextGreen: {
//     fontSize: (screenHeight<700)? 14:16,
//     fontWeight: 'bold',
//     top: -1,
//     color: '#79B847',
//   },
//   textBox: {
//     height: 100,
//     width: screenWidth - 50,
//     textAlignVertical: 'top',
//     margin: 5,
//     padding: 10,
//     fontSize: (screenHeight<700)? 12:14,
//     borderColor: colors.silverchalice,
//     borderWidth: 2,
//   },
//   buttonContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 20
//   },
//   button: {
//     marginVertical: 10,
//     paddingVertical: 5,
//     alignItems: 'center',
//     backgroundColor: '#08547D',
//     borderColor: '#08547D',
//     borderWidth: 1,
//     borderRadius: 5,
//     width: 150
//   },
//   secondaryButton: {
//     marginVertical: 10,
//     paddingVertical: 5,
//     alignItems: 'center',
//     backgroundColor: '#D7DBDD',
//     borderWidth: 1,
//     borderRadius: 5,
//     width: 150,
//     borderColor: '#D7DBDD'
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     color: '#2C3E50'
//   },
//   toggleView: {
//     flexDirection: 'row',
//     flexWrap:'wrap',
//     marginTop: 5,
//     paddingVertical: 10,
//     paddingHorizontal: (screenHeight<700)? 6:20,
//     width: '100%',
//     justifyContent: 'space-between'
//   }
// })
