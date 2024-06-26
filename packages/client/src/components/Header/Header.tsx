import { FC, useEffect, useRef } from 'react'
import { Avatar, Flex, Layout, Switch } from 'antd'
import { EPATH } from '../../models/models'
import { Link } from 'react-router-dom'
import { StarOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../store/slices/userSlice/user.slice'
import { imgUrl } from '../../utils/api/consts'
import { useAppDispatch } from '../../store/store'
import { getUser } from '../../store/slices/userSlice/user.thunk'
import styled from 'styled-components'
import * as palette from '../../constants/color'
import { changeTheme, themeSelector } from '../../store/slices/theme.slice'

const HeaderLayout = styled(Layout.Header)`
  a {
    text-decoration: none;
  }
`
const ControlsSwitch = styled(Switch)`
  &.ant-switch.ant-switch-checked {
    background: ${palette.DEEP_PINK};
    &:hover {
      background: ${palette.DEEP_PINK};
    }
  }
`

export const Header: FC = () => {
  const { id, avatar } = useSelector(userSelector)
  const dispatch = useAppDispatch()
  const dispatchTheme = useDispatch()

  const theme: boolean = useSelector(themeSelector)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      localStorage.setItem('theme', JSON.stringify(theme))
    }
  }, [theme])

  useEffect(() => {
    if (!id) dispatch(getUser())
  }, [])

  return (
    <HeaderLayout>
      <Flex justify="space-between">
        <Flex gap="middle" color="white">
          <Link to={EPATH.MAIN}>Играть</Link>
          <Link to={EPATH.FORUM}>Форум</Link>
          <Link to={EPATH.LEADER_BOARD}>
            <StarOutlined />
          </Link>
        </Flex>
        <Flex gap="middle" align="center">
          <span>Тема</span>
          <ControlsSwitch
            value={theme}
            onChange={() => dispatchTheme(changeTheme())}
          />
          <Link to={EPATH.PROFILE}>
            <Avatar
              src={`${imgUrl}${avatar}`}
              size="default"
              icon={<UserOutlined />}
            />
          </Link>
        </Flex>
      </Flex>
    </HeaderLayout>
  )
}
