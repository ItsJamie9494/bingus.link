// Copyright (C) 2021 Jamie Thalacker

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
// Add Styles

let embedPreviewStyles = `
    border: 1px solid #bec9d0;
    border-radius: 0.42857em;
    overflow: hidden;
    width: 75%;
    @media (min-width: 1024px) {
        width: 100%; 
    }
`
const embedPreviewImageStyles = (embedImage: string) => `
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    line-height: 1.3em;
    font-size: 14px;
    color: #38363b;
    padding-top: 52.36%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${embedImage});
    width: 100%;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    text-align: center;
`

let embedPreviewCaptionStyles = `
    text-align: left;
    padding: 0.75em;
    padding-right: 0.75em;
    padding-left: 0.75em;
    padding-left: 1em;
    padding-right: 1em;
    display: flex;
    flex-direction: column;
`

let embedPreviewTitleStyles = `
    font-weight: bold;
    margin: 0 0 0.15em;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 18.2px;
    color: #000;
    max-width: 300px;
`

let embedPreviewDescriptionStyles = `
    margin: 0 0 0.15em;
    font-size: 14px;
    line-height: 18px;
    max-height: 36px;
    overflow: hidden;
    font-size: 14px;
    line-height: 18.2px;
    color: #000;
    max-width: 300px;
`

let embedPreviewURLStyles = `
    color: #899aa6 !important;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 18.2px;
`

export default function createEmbed(
    embedImage: string,
    embedTitle: string,
    embedDescription: string,
    embedUrl: string
) {
    let stylesheet = `
        #embedpreview {
            ${embedPreviewStyles}
        }

        #embedpreview-image {
            ${embedPreviewImageStyles(embedImage)}
        }

        #embedpreview-caption {
            ${embedPreviewCaptionStyles}
        }

        #embedpreview-title {
            ${embedPreviewTitleStyles}
        }

        #embedpreview-description {
            ${embedPreviewDescriptionStyles}
        }

        #embedpreview-url {
            ${embedPreviewURLStyles}
        }
    `

    let embedPreview = document.getElementsByTagName('embedpreview')[0]

    // Create workspace
    let image = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'elementpreview-image'
    )
    let caption = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'elementpreview-caption'
    )
    let title = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'elementpreview-title'
    )
    let description = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'elementpreview-description'
    )
    let url = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'elementpreview-url'
    )
    let styles = document.createElement('style')

    styles.innerHTML = stylesheet

    embedPreview.id = 'embedpreview'

    image.id = 'embedpreview-image'
    caption.id = 'embedpreview-caption'
    title.id = 'embedpreview-title'
    description.id = 'embedpreview-description'
    url.id = 'embedpreview-url'
    document.head.append(styles)
    embedPreview.appendChild(image)
    embedPreview.appendChild(caption)
    caption.appendChild(title)
    caption.appendChild(description)
    caption.appendChild(url)

    title.innerHTML = embedTitle
    description.innerHTML = embedDescription
    url.innerHTML = embedUrl
}
