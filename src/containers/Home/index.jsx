import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { getUserList } from '../../store/actions';
import styles from './index.css';
import withStyle from '../../hoc/withStyle';

const Home = (props) => {
  const { userList } = props;
  const store = useStore();

  return (
    <div className={styles.box}>
      <h1>首页</h1>
      <ul>
        {userList?.map((user) => {
          const { first_name, last_name, email, avatar, id } = user;
          return (
            <li key={id}>
              <img
                src={avatar}
                alt="用户头像"
                style={{ width: '30px', height: '30px' }}
              />
              <div>姓名：{`${first_name}${last_name}`}</div>
              <div>email：{email}</div>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/login">跳转到登录页</Link>
      <br />
      <button onClick={() => console.log('click me', store.getState())}>
        点击
      </button>
    </div>
  );
};

const _Home = withStyle(Home, styles);

_Home.getInitialData = async (store) => {
  return store.dispatch(getUserList());
};

const mapStateToProps = (state) => ({
  name: state.name,
  userList: state.userList,
});

// const mapDispatchToProps = (dispatch) => ({
//   getUserList() {
//     dispatch(getUserList(dispatch));
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps, null)(_Home);
