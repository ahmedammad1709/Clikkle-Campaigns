import React from "react";
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs/dist/grapes.min.js'
import webPlugin from 'grapesjs-preset-webpage'
import formPlugin from 'grapesjs-plugin-forms'
import basicPlugin from 'grapesjs-blocks-basic'
import ReactText from "./simple-react-text";
import BaseReactComponent from './base-react-component';
import grapejsRulers from 'grapesjs-rulers';
import tabs from 'grapesjs-tabs';
import flexbox from 'grapesjs-blocks-flexbox'
import { useParams } from "react-router-dom";
import axios from "axios";


function WebBuilder({ component, dependency }) {
  const { id } = useParams()
  React.useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: 'calc(100vh - 54px)',
      width: '100%',
      components: '',
      plugins: [basicPlugin, formPlugin, webPlugin, BaseReactComponent, grapejsRulers, tabs, flexbox],
      projectData: component || {
        pages: [
          {
            component: `
            <div class="test">Initial content</div>
            <style>.test { color: red }</style>
          `
          }
        ]
      },

      storageManager: {
        id: 'gjs-',
        type: 'remote',
        autosave: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        urlLoad: `http://193.46.198.138:8000/user/templates/${id}`,
        urlStore: `http://193.46.198.138:8000/user/templates/${id}`,
        fetchOptions: { method: 'get' },
        onStore: data => ({ id: id, data }),
        onLoad: result => result.data,
      },
      deviceManager: {
        devices:
          [
            {
              id: 'desktop',
              name: 'Desktop',
              width: '',
            },
            {
              id: 'tablet',
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              id: 'mobilePortrait',
              name: 'Mobile portrait',
              width: '320px',
              widthMedia: '575px',
            },
          ]
      },
      pluginsOpts: {
        'grapesjs-preset-webpage': {
          blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map'],
        },
      }
    })

    editor.BlockManager.add('my-block-id', {
      label: 'ReactText',
      category: 'ePOS',
      components: ReactText,
      activate: true
      // ...
    })
    editor.Storage.add('remote', {
      async load() {
        return await axios.get(
          `http://193.46.198.138:8000/user/templates/${id}`
        )
      },
      async store(data) {
        return await axios.patch(
          `http://193.46.198.138:8000/user/templates/${id}`,
          data
        );
      }
    })
    editor.DomComponents.addType('Footer', {
      model: {
        defaults: {
          tagName: 'div',
          // Component won't be removable
          removable: false
        }
      },
      view: {
        tagName: 'div',
        onRender() {
          return <div>This is footer</div>
        }
      }
    });
    editor.setComponents([{
      type: 'Footer',
      tagName: 'div',
      attributes: { title: 'Hello' }
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dependency])

  return (
    <div>
      <div id="gjs">
        <h1>THis is goodsaf</h1>
      </div>
    </div>
  );
}
export default WebBuilder;