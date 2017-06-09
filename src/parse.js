/***************************************************************************************************************************************************************
 *
 * Parsing different languages
 *
 * ParseFM    - Parsing front matter out of a page if it exists
 * ParseMD    - Parsing markdown into HTML
 * ParseYaml  - Parsing yaml into an object
 *
 **************************************************************************************************************************************************************/

'use strict';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
import Marked from 'marked';
import React from 'react';
import YAML from 'yamljs';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Helper
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
import { Log, Style } from './helper';


/**
 * Parsing front matter out of a page if it exists
 *
 * @param  {string} content - The content of a partial with or without front matter
 *
 * @return {object}         - An object with parsed out front matter and it’s parsed yaml and the body. format: { frontmatter: {}, body: '' }
 */
export const ParseFM = ( content ) => {
	if( content.startsWith('---\n') ) {
		const bodyParts = content.split('---\n');

		return {
			frontmatter: ParseYaml( bodyParts[1] ),
			body: ParseMD( bodyParts.slice( 2 ).join('---\n') ),
		}
	}
	else {
		return {
			frontmatter: {},
			body: content,
		};
	}
}


/**
 * Parsing markdown into HTML using https://github.com/chjj/marked
 *
 * @param  {string} markdown - The markdown string
 *
 * @return {string}          - HTML rendered from the given markdown
 */
export const ParseMD = ( markdown ) => {
	return Marked( markdown );
}


/**
 * Parsing yaml into an object using https://github.com/jeremyfa/yaml.js
 *
 * @param  {string} yaml - A yaml string
 *
 * @return {object}      - The parsed yaml
 */
export const ParseYaml = ( yaml ) => {
	return YAML.parse( yaml );
}
