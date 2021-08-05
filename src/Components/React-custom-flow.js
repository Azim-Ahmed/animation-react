import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  removeElements,
  Controls,
  Background,
  useStoreState,
  updateEdge,
} from 'react-flow-renderer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RectangleNode from '../../Components/FlowComponents/CustomNode';
import DiamondNode from '../../Components/FlowComponents/DiamondNode';
import OutputNode from '../../Components/FlowComponents/OutputNode';
import StartNode from '../../Components/FlowComponents/StartNode';
import ConnectionLine from '../../Components/FlowComponents/ConnectionLine';
import CustomEdge from '../../Components/FlowComponents/CustomEdge';
import Layout from '../../Components/Layout';
import WebSocks from '../InitialSock/WebSocks';
import Modal from '../../Components/Reusable/Modal';
import './dnd.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadDiagramFromBackend,
  addNodeDataToTheTable,
  editableNodeDataToTheTable,
  updateNodeDataToTheTable,
} from '../../redux/actions';
import { nanoid } from 'nanoid';
import {
  TextField,
  makeStyles,
  Button,
  ClickAwayListener,
  Grid,
  Typography,
} from '@material-ui/core';
import NodeTable from '../../Components/FlowComponents/NodeTable';
import TableModal from '../../Components/Reusable/TableModal';
import { useForm } from 'react-hook-form';
const nodeTypes = {
  start: StartNode,
  end: OutputNode,
  rectangle: RectangleNode,
  diamond: DiamondNode,
};
const edgeTypes = {
  custom: CustomEdge,
};
//loaded from api or Empty Array
const initText = 'Write your Text';

const FinalDiagram = () => {
  //from whole selected ELements
  const selectedElements = useStoreState((store) => store.selectedElements);

  //redux start
  const {
    decisionNodeInitialData,
    initialElements,
    valueStream,
    openToEdit,
    editableData:defaultValues,
  } = useSelector((state) => state.diagram);
console.log(",,,,,,,,,,,,,,,,,,,,,,,,,", defaultValues)
  const auth = useSelector((state) => state.auth);
  const { organizationId } = auth?.user;
  const dispatch = useDispatch();

  //main Elements State
  const [elements, setElements] = useState([]);

  //component Did mount or unmount
  useEffect(() => {
    if (organizationId) {
      dispatch(loadDiagramFromBackend(organizationId));
    }
  }, [organizationId]);

  //initial Data or from backend uder the organization
  useEffect(() => {
    if (initialElements.messageContent) {
      setElements(initialElements.messageContent);
    }
  }, [initialElements.messageContent]);

  //useRef for DOM node
  const reactFlowWrapper = useRef(null);
  const labelRef = useRef();
  //instance
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  //opening the Modal of form
  const [openDoubleClick, setOpenDoubleClick] = useState(false);
  //opening the Modal of form
  const [openElementClick, setOpenElementClick] = useState(false);
  //state of click way lister who takes the data from a form
  const [openClickWayListener, setOpenClickWayListener] = useState(false);
  //state of click way lister who takes the data from a form
  const [openUpdateClickWayListener, setOpenUpdateClickWayListener] =
    useState(false);
  //modal Data
  const [updatedOnClickElement, setUpdatedOnClickElement] = useState({});
  //for table Data to show the table
  // const [decisionNodeInitialData, setDecisionNodeInitialData] = useState([]);
  //modal Data
  const [updatedData, setUpdatedData] = useState({});
  //state changes on websocket
  const [pendingRequest, setPendingRequest] = useState(false);
  const [inputData, setinputData] = useState(null);

  //onConnect Function
  const onConnect = (params) => {
    setElements((els) =>
      addEdge(
        {
          type: 'smoothstep',
          style: { stroke: 'black' },
          selectable: true,
          ...params,
          arrowHeadType: 'arrow',
        },
        els
      )
    );
    setPendingRequest(true);
  };
  const onEdgeUpdate = (oldEdge, newConnection) => {
    setElements((els) => updateEdge(oldEdge, newConnection, els));
    setPendingRequest(true);
  };
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
    setPendingRequest(true);
  };

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    //new node Data
    const newNode = {
      id: `node_${type}_${nanoid(7)}`,
      type,
      position,
      data: { label: `${type} node`, text: initText },
    };
    setElements((es) => es.concat(newNode));
    // setPendingRequest(true);
  };
  //rhf
  const {
    formState: { errors: errorsData },
    clearErrors:clearErrorsAdd,
    register:registerAdd,
    handleSubmit:handleSubmitAdd,
    reset:resetAdd,
  } = useForm();

   const {
    formState: { errors },
    clearErrors,
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues
  });
  const onSubmit = (data) => {
    data.id = nanoid(4);
    dispatch(addNodeDataToTheTable(data));
    setOpenClickWayListener(false);
    reset();
  };

  //TODOupdate Node Data of particular thing
  const onUpdateSubmit = (data) => {
    console.log('kkdskjdaskhdkhaskdhkashkdhkads', data);
    dispatch(updateNodeDataToTheTable(data));
    dispatch(editableNodeDataToTheTable(false));
    // reset();
  };

  const renderOpenClickWayListener = () => {
    return (
      <ClickAwayListener onClickAway={() => setOpenClickWayListener(false)}>
        <div className={classes.ClickRoot}>
          {openClickWayListener && (
            <div className={classes.dropdown}>
              <Typography variant='h6' component='p'>
                Add New Instruction
              </Typography>
              <form
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Source'
                      placeholder='Source'
                      {...register('source', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errorsData.source && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Source required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Input'
                      placeholder='Input'
                      {...register('input', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errorsData.input && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Input Here
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Step'
                      placeholder='Step'
                      {...register('step', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errorsData.step && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Step is required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Output'
                      placeholder='Output'
                      {...register('output', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errorsData.output && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Output is required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Destination'
                      placeholder='Destination'
                      {...register('destination', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errorsData.destination && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Destination is required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Purpose'
                      placeholder='Add new stream'
                      {...register('purpose', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errorsData.purpose && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Purpose is required
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <div className={classes.AddInstructionBtn}>
                  <Button
                    style={{ margin: '20px 20px 10px 0px' }}
                    variant='outlined'
                    color='primary'
                    type='submit'
                  >
                    Add Instruction
                  </Button>
                  <Button
                    style={{ margin: '20px 20px 10px 0px' }}
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      setOpenClickWayListener(false);
                      clearErrorsAdd();
                    }}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </ClickAwayListener>
    );
  };

  //functions of update form
  const handleCloseUpdateForm = () => {
    clearErrors();
    dispatch(editableNodeDataToTheTable(false));
  };
  const renderUpdateClickWayListener = () => {
    return (
      <ClickAwayListener onClickAway={handleCloseUpdateForm}>
        <div className={classes.ClickRoot}>
          {openToEdit && (
            <div className={classes.dropdown}>
              <Typography variant='h6' component='p'>
                Update Instruction
              </Typography>
              <form
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onUpdateSubmit)}
              >
                <Grid container>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Source'
                      // defaultValue={editableData.source}
                      placeholder='Source'
                      {...register('source', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.source && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Source required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      // defaultValue={editableData.input}
                      label='Input'
                      placeholder='Input'
                      {...register('input', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.input && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Input Here
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      // defaultValue={editableData.step}
                      label='Step'
                      placeholder='Step'
                      {...register('step', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.step && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Step is required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Output'
                      // defaultValue={editableData.output}
                      placeholder='Output'
                      {...register('output', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.output && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Output is required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      variant='outlined'
                      label='Destination'
                      // defaultValue={editableData.destination}
                      placeholder='Destination'
                      {...register('destination', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.destination && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Destination is required
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      style={{ margin: '20px' }}
                      // defaultValue={editableData.purpose}
                      variant='outlined'
                      label='Purpose'
                      placeholder='Add new stream'
                      {...register('purpose', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.purpose && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Purpose is required
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <div className={classes.AddInstructionBtn}>
                  <Button
                    style={{ margin: '20px 20px 10px 0px' }}
                    variant='outlined'
                    color='primary'
                    type='submit'
                  >
                    Update Instruction
                  </Button>
                  <Button
                    style={{ margin: '20px 20px 10px 0px' }}
                    variant='outlined'
                    color='secondary'
                    onClick={handleCloseUpdateForm}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </ClickAwayListener>
    );
  };

  const renderUpdateFormModal = () => {
    return (
      <Modal
        open={openElementClick}
        handleClose={() => setOpenElementClick(false)}
      >
        <TextField
          inputRef={labelRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUpdateNodeData(labelRef.current.value);
              setinputData(labelRef.current.value);
              setOpenElementClick(false);
              setPendingRequest(true);
            }
          }}
          className={classes.nodetext}
          id='outlined-basic'
          multiline
          label='Write node text'
          variant='filled'
        />

        <div style={{ border: '1px solid gray' }}>
          <p>{updatedOnClickElement.data?.label} </p>
          <p>{updatedOnClickElement.id} </p>
        </div>
      </Modal>
    );
  };

  //renderTableModalForUpdateNode

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const renderTableModalForUpdateNodeData = () => {
    return (
      <TableModal
        open={openDoubleClick}
        handleClose={() => setOpenDoubleClick(false)}
      >
        <div
          style={{
            border: '1px solid gray',
            background: '#005ae5',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0px 20px',
            marginBottom: '30px',
          }}
        >
          <div>
            <h1>{updatedData.data?.text} </h1>
          </div>
        </div>
        {openClickWayListener && renderOpenClickWayListener()}
        {openToEdit && renderUpdateClickWayListener()}
        <div>
          <Button
            className={classes.buttonForTable}
            variant='contained'
            color='primary'
            onClick={() => setOpenClickWayListener(true)}
          >
            Add New Instruction
          </Button>
        </div>
        <NodeTable rows={decisionNodeInitialData} />
      </TableModal>
    );
  };

  const handleUpdateNodeData = (data) => {
    // if (data) {
    //   setElements((els) => {
    //     const newElements = JSON.parse(JSON.stringify(els));
    //     newElements.map((el) => {
    //       if (el.id !== updatedData.id) return el;
    //       if (el.id === updatedData.id) {
    //         el.data.text = data;
    //         return el;
    //       }
    //     });
    //   });
    // }
    // // setPendingRequest(true);
    if (inputData) {
      const els = [...elements];

      const maped = els.map((el) => {
        if (el.id === updatedOnClickElement.id) {
          el.data.text = inputData;
        }
        return el;
      });
      setElements(maped);
      setPendingRequest(true);
    }
  };

  //onNodeDoubleClick
  //TODO need to update
  const onElementClick = (event, element) => {
    // setOpenElementClick(true);
    // const data = { ...element };
    // setUpdatedOnClickElement(data);
  };
  const onNodeDoubleClick = (event, element) => {
    if (element.type === 'rectangle') {
      setOpenDoubleClick(true);
      const data = { ...element };
      setUpdatedData(data);
    }
  };
  const SideBar = () => {
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
    return (
      <aside>
        <div className='description'>
          You can drag these nodes to the pane on the left.
        </div>
        <div
          title='start'
          style={{
            background: '#4741BE',
            color: 'white',
            padding: '20px 10px',
            borderRadius: '7px',
            margin: '20px 0px',
          }}
          className='dndnode'
          onDragStart={(event) => onDragStart(event, 'start')}
          draggable
        >
          <AddCircleOutlineIcon style={{ marginRight: '4px' }} /> Start
        </div>
        <div
          title='rectangle'
          style={{
            background: '#4741BE',
            color: 'white',
            padding: '20px 40px',
            borderRadius: '7px',
            margin: '20px 0px',
          }}
          className='dndnode'
          onDragStart={(event) => onDragStart(event, 'rectangle')}
          draggable
        >
          <AddCircleOutlineIcon style={{ marginRight: '4px' }} /> Decision
        </div>
        <div
          title='decision'
          className='dndnode'
          onDragStart={(event) => onDragStart(event, 'diamond')}
          draggable
          style={{
            background: '#4741BE',
            color: 'white',
            padding: '20px 10px',
            borderRadius: '7px',
            margin: '20px 0px',
          }}
        >
          <AddCircleOutlineIcon style={{ marginRight: '4px' }} /> Diamond
        </div>
        <div
          title='end'
          style={{
            background: '#4741BE',
            color: 'white',
            padding: '20px 40px',
            borderRadius: '7px',
            margin: '20px 0px',
          }}
          className='dndnode'
          onDragStart={(event) => onDragStart(event, 'end')}
          draggable
        >
          <AddCircleOutlineIcon style={{ marginRight: '4px' }} /> End
        </div>
      </aside>
    );
  };
  // useEffect(() => {
  //   if (inputData) {
  //     const els = [...elements];

  //     const maped = els.map((el) => {
  //       if (el.id === updatedData.id) {
  //         el.data.text = inputData;
  //       }
  //       return el;
  //     });
  //     setElements(maped);
  //     setPendingRequest(true);
  //   }
  // }, [inputData, updatedData.id, elements]);
  // css
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div className='dndflow'>
          <div className='reactflow-wrapper' ref={reactFlowWrapper}>
            <ReactFlow
              nodeTypes={nodeTypes}
              connectionLineComponent={ConnectionLine}
              connectionLineType='smoothstep'
              elements={elements}
              onElementClick={onElementClick}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              edgeTypes={edgeTypes}
              onDragOver={onDragOver}
              onNodeDoubleClick={onNodeDoubleClick}
              onEdgeUpdate={onEdgeUpdate}
              arrowHeadColor='#595A66'
            >
              <Background variant='dots' gap={12} size={0.8} />
              <Controls />
            </ReactFlow>
          </div>
          {SideBar()}
          {openElementClick && renderUpdateFormModal()}
          {openDoubleClick && renderTableModalForUpdateNodeData()}
        </div>
      </div>
      <WebSocks
        setElements={setElements}
        elements={elements}
        pendingRequest={pendingRequest}
        setPendingRequest={setPendingRequest}
      />
    </Layout>
  );
};

export default FinalDiagram;

const useStyles = makeStyles((theme) => ({
  ClickRoot: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  toolbarGroup: {
    background: '#FFF',
    border: '1px solid darkgrey',
    padding: '4px',
  },
  AddInstructionBtn: {},
  attributeGroup: {
    paddingTop: '5px',
  },
  nodetext: {
    margin: '25px 0px 10px 0px',
    background: 'white',
    width: '100%',
  },
  buttonForTable: {
    marginBottom: 29,
  },
}));
