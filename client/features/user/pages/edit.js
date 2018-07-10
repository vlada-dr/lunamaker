import * as React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { ProfileTemplate } from 'ui/templates'
import { Avatar } from 'ui/molecules'
import { CloudWrapper, Layout } from 'ui/atoms'
import { TabLink } from '../atoms'
import { Account, Password, Contacts } from '../organisms'
import { mainEdit, update, blur } from '../actions'


const mapStateToProps = (state) => ({
  user: state.common.user,
  edit: state.user.edit,
})

const mapDispatchToProps = (dispatch) => ({
  updateField: (name, value) => dispatch(update(name, value)),
  check: (name, error) => dispatch(blur(name, error)),
  onSubmit: (user) => dispatch(mainEdit(user)),
})


const Wrapper = CloudWrapper.extend`
  justify-content: flex-start;
  align-items: center;
  & > *  {
    margin: 1rem;
  }
`


const EditView = ({
  user, edit: { touched, errors },
  updateField, check, onSubmit,
}) => {
  const onBlur = ({ target: { name, value } }) => (value.length > 0) && check(name, value)

  const onChange = ({ target: { name, value } }) => {
    updateField(name, value)
    if (touched[name] && errors[name].length > 0) {
      onBlur({ target: { name, value } })
    }
  }

  return (
    <ProfileTemplate>
      <Wrapper>
        <Layout flow='row' justify='space-around'>
          <TabLink to='/edit/account' title='Профіль' />
          <TabLink to='/edit/password' title='Пароль' />
          <TabLink to='/edit/contacts' title='Контакти' />
        </Layout>
        <Avatar
          src={user.photo}
          onChange={(value) => updateField('photo', value)}
          size='15vh'
        />
        <Route
          path="/edit/account"
          render={() => (
            <Account
              onChange={onChange}
              onBlur={onBlur}
              onAgeChange={updateField}
              user={user}
              errors={errors}
            />
          )}
        />
        <Route
          path="/edit/password"
          component={Password}
        />
      </Wrapper>
    </ProfileTemplate>
  )
}

export const EditUser = connect(mapStateToProps, mapDispatchToProps)(EditView)
