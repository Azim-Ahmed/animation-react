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
                    <Controller
                      name='source'
                      control={control}
                      defaultValue={editableData.source}
                      rules={{
                        required: true,
                        maxLength: 30,
                        pattern: {
                          value: /^\s*([a-zA-Z]+\s*){3}$/,
                          message: 'Three Words Format Only',
                        },
                      }}
                      render={({ field }) => (
                        <CssTextField
                          {...field}
                          label='Source'
                          variant='outlined'
                          type='text'
                        />
                      )}
                    />

                    {errors.source && (
                      <Typography style={{ margin: '0' }} color='error'>
                        {errors.source.message}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item md={4}>
                    <Controller
                      name='input'
                      control={control}
                      defaultValue={editableData.input}
                      rules={{
                        required: true,
                        maxLength: 30,
                        pattern: {
                          value: /^\s*([a-zA-Z]+\s*){3}$/,
                          message: 'Three Words Format Only',
                        },
                      }}
                      render={({ field }) => (
                        <CssTextField
                          {...field}
                          label='Input'
                          variant='outlined'
                          type='text'
                        />
                      )}
                    />
                    {errors.input && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        {errors.input.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <Controller
                      name='step'
                      control={control}
                      defaultValue={editableData.step}
                      rules={{
                        required: true,
                        maxLength: 30,
                        pattern: {
                          value: /^\s*([a-zA-Z]+\s*){3}$/,
                          message: 'Three Words Format Only',
                        },
                      }}
                      render={({ field }) => (
                        <CssTextField
                          {...field}
                          label='Step'
                          variant='outlined'
                          type='text'
                        />
                      )}
                    />
                    {errors.step && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        {errors.step.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <Controller
                      name='output'
                      control={control}
                      defaultValue={editableData.output}
                      rules={{
                        required: true,
                        maxLength: 30,
                        pattern: {
                          value: /^\s*([a-zA-Z]+\s*){3}$/,
                          message: 'Three Words Format Only',
                        },
                      }}
                      render={({ field }) => (
                        <CssTextField
                          {...field}
                          label='Output'
                          variant='outlined'
                          type='text'
                        />
                      )}
                    />
                    {errors.output && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        Output is required
                        {errors.output.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <Controller
                      name='destination'
                      control={control}
                      defaultValue={editableData.destination}
                      rules={{
                        required: true,
                        maxLength: 30,
                        pattern: {
                          value: /^\s*([a-zA-Z]+\s*){3}$/,
                          message: 'Three Words Format Only',
                        },
                      }}
                      render={({ field }) => (
                        <CssTextField
                          {...field}
                          label='Destination'
                          variant='outlined'
                          type='text'
                        />
                      )}
                    />
                    {errors.destination && (
                      <Typography style={{ margin: '0', color: 'red' }}>
                        {errors.destination.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <Controller
                      name='purpose'
                      control={control}
                      defaultValue={editableData.purpose}
                      rules={{
                        required: true,
                        maxLength: 30,
                        pattern: {
                          value: /^\s*([a-zA-Z]+\s*){3}$/,
                          message: 'Three Words Format Only',
                        },
                      }}
                      render={({ field }) => (
                        <CssTextField
                          {...field}
                          label='Purpose'
                          variant='outlined'
                          type='text'
                        />
                      )}
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
