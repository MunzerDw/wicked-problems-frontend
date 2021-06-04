import Flex from 'components/Flex'
import Icon from 'components/Icon'
import LinkTab from 'components/LinkTab'
import Menu from 'components/Menu/Menu'
import ThemeToogle from 'components/ThemeToogle'
import project from 'models/Project'
import { useEffect } from 'react'

function CanvasPage({ className, topBar, ...props }) {
  const urlSafeName = window.location.pathname.split('/')[2]
  useEffect(() => {
    project.loadProjectAndNodes(urlSafeName)
    // eslint-disable-next-line
  }, [])
  return (
    <div className="h-screen w-screen dark:bg-gray-800">
      <Flex.Row space="0" align="start" className="w-full h-full relative">
        <Menu />
        <Flex.Col space="0" className="w-full h-full">
          <div className="w-full p-1 px-2 flex justify-between items-center shadow">
            <Flex.Row>
              {/* <MenuToggle /> */}
              <Flex.Row space="2">
                <div>{project.getProject()?.name}</div>
                {project.getProject()?.public && (
                  <Icon title="public" color="green" name="FaGlobeEurope" />
                )}
              </Flex.Row>
              {topBar}
            </Flex.Row>
            <div
              style={{
                position: 'absolute',
                zIndex: '100',
                left: '50%',
                transform: 'translate(-50%)',
              }}
            >
              <Flex.Row>
                <LinkTab to={'/projects/' + urlSafeName}>Canvas</LinkTab>
                <LinkTab to={'/projects/' + urlSafeName + '/statistics'}>
                  Statistics
                </LinkTab>
                <LinkTab to={'/projects/' + urlSafeName + '/snapshots'}>
                  Snapshots
                </LinkTab>
                <LinkTab to={'/projects/' + urlSafeName + '/publicanalysis'}>
                  Public Analysis
                </LinkTab>
              </Flex.Row>
            </div>
            <ThemeToogle />
          </div>
          <div className={'w-full h-full relative overflow-auto ' + className}>
            {props.children}
          </div>
        </Flex.Col>
      </Flex.Row>
    </div>
  )
}
export default CanvasPage
