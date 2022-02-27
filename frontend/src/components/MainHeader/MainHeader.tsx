import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, PageHeader, Popover, Typography } from 'antd';
import { FC, useState } from 'react';

import styles from './styles.module.scss';

const { Text } = Typography;

const Menu: FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('log out fetch');
        }}>
        Выйти
      </Button>
    </div>
  );
};

export const MainHeader: FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const handleVisibleChange = (visible: boolean) => {
    setShowPopover(visible);
  };

  return (
    <PageHeader
      className={styles['page-header']}
      title={<Text className={styles['page-header__title']}>CyberSport</Text>}
      backIcon={false}
      extra={[
        <Text key="0" className={styles['page-header__user-name']}>
          Пользователь
        </Text>,

        <Popover
          key="1"
          content={Menu}
          title={<Text strong>Инфо</Text>}
          placement="bottom"
          trigger="click"
          visible={showPopover}
          onVisibleChange={handleVisibleChange}>
          <Avatar
            icon={<UserOutlined />}
            className={styles['page-header__avatar']}
          />
        </Popover>,
      ]}
    />
  );
};
