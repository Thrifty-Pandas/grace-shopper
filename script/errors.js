function userFormErrorHandler(res, err) {
  if (err.errors[0].message === 'userName must be unique') {
    res.status(401).send('Username is already taken')
  } else if (err.errors[0].message === 'email must be unique') {
    res.status(401).send('This email is already in use')
  } else if (
    err.errors[0].message === 'Validation isAlphanumeric on userName failed'
  ) {
    res.status(401).send('Username must be alphanumeric')
  } else if (
    err.errors[0].message === 'Validation isAlpha on firstName failed'
  ) {
    res.status(401).send('First name can only contain letters')
  } else if (
    err.errors[0].message === 'Validation isAlpha on lastName failed'
  ) {
    res.status(401).send('Last name can only contain letters')
  } else if (err.errors[0].message === 'Validation isEmail on email failed') {
    res.status(401).send('Enter a valid email')
  } else if (err.errors[0].message === 'Validation len on password failed') {
    res.status(401).send('Your Password must be at least 5 characters')
  } else if (
    err.errors[0].message === 'Validation notEmpty on password failed'
  ) {
    res.status(401).send('You must have a password!')
  }
}
module.exports = userFormErrorHandler
