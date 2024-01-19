import {Component} from 'react'
import PasswordManagerItem from '../PasswordManagerItem'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class PasswordManager extends Component {
  state = {
    itemsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isChecked: false,
  }
  onAddPasswordList = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state
    const newItem = {
      id: uuidv4(),
      websiteInput,
      usernameInput,
      passwordInput,
    }
    this.setState(prev => ({
      itemsList: [...prev.itemsList, newItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onDeleteItem = id => {
    const {itemsList} = this.state
    const updatedList = itemsList.filter(each => each.id !== id)

    this.setState({itemsList: updatedList})
  }

  updateSearchList = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangewebInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  isChecked = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  renderNoPasswordsView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />

      <p>No Passwords</p>
    </div>
  )
  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      isChecked,
      itemsList,
      searchInput,
    } = this.state

    const updatedList = itemsList.filter(each =>
      each.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const count = updatedList.length

    return (
      <div className="bg-Container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-form-Container">
          <form className="form" onSubmit={this.onAddPasswordList}>
            <h1 className="password-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                className="input-item"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onChangewebInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                className="input-item"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onChangeUserInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                className="input-item"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>

          <div className="password-manager-image">
            <img
              className="password-manager-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="password-items-Container">
          <div className="password-count-container">
            <h1 className="password-heading">Your passwords </h1>
            <p className="count">{count}</p>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                className="input-item-search"
                placeholder="search"
                onChange={this.updateSearchList}
              />
            </div>
          </div>
          <hr className="horizintal-line" />
          <div className="chechbox-Container">
            <input
              id="passwordInput"
              type="checkbox"
              className="chechbox"
              onChange={this.onChecked}
            />
            <label className="label-Name" htmlFor="passwordInput">
              Show Passwords
            </label>
          </div>
          {count === 0 ? (
            this.renderNoPasswordsView()
          ) : (
            <ul className="list-items-container">
              {updatedList.map(each => (
                <PasswordManagerItem
                  key={each.id}
                  itemDetails={each}
                  isChecked={isChecked}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
