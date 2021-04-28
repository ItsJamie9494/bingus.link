// Copyright (C) 2021 Trevor Thalacker

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// This file creates Embed Previews

interface createEmbed {
    embedImage: string,
    embedTitle: string,
    embedDescription: string,
    embedUrl: string
}

const createEmbed = ({ embedImage, embedTitle, embedDescription, embedUrl }: createEmbed) => {
    let embedPreview = document.getElementsByTagName('embedpreview')[0]
    
    // Create workspace
    let image = document.createElement('div')
    let caption = document.createElement('div')
    let title = document.createElement('span')
    let description = document.createElement('span')
    let url = document.createElement('span')
    
    image.id = "embedpreview-image"
    caption.id = "embedpreview-caption"
    title.id = "embedpreview-title"
    description.id = "embedpreivew-description"
    url.id = "embedpreview-url"
    embedPreview.appendChild(image)
    embedPreview.appendChild(caption)
    caption.appendChild(title)
    caption.appendChild(description)
    caption.appendChild(url)
    
    // Add Styles
    let embedPreviewStyles = `
        border: 1px solid #bec9d0;
        border-radius: 0.42857em;
        overflow: hidden;
    `
    let embedPreviewImageStyles = `
        position: absolute;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        text-align: center;
    `
}

/* 
    DOM Tree
    <embedpreview>
        <div id="image" />
        <div id="caption">
            <span id="title">Title</span>
            <span id="description">Description</span>
            <span id="url">URL</span>
        </div>
    </embedpreview>
*/