namespace $ {

	export class $mol_build2_6bundle_npm_deps extends $mol_build2_6bundle {

		repo_dir( pack: $mol_build2_4package ) {
			const root = this.root().dir()
			for( let dir = pack.dir(); dir !== root; dir = dir.parent() ) {
				if( dir.resolve( '.git' ).exists() ) return dir
			}
			return null
		}

		own_deps( slice: $mol_build2_5slice, dir: $mol_file ) {
			const deps = new Set< string >()
			const prefix = dir.path() + '/'
			for( const file of slice.files() ) {
				if( !file.path().startsWith( prefix ) ) continue
				const npm = this.root().source([ this.$.$mol_build2_9source_ts, file ])?.ts_source_deps().npm
				npm?.deps.forEach( dep => deps.add( dep ) )
			}
			return deps
		}

		version( dep: string ) {
			const json = this.root().dir().resolve( `node_modules/${ dep }/package.json` )
			if( !json.exists() ) return '*'
			const version = JSON.parse( json.text() ).version
			return version ? `^${ version }` : '*'
		}

		@ $mol_mem_key
		pack_artifacts( pack: $mol_build2_4package ) {

			const dir = this.repo_dir( pack )
			if( !dir ) return []

			const deps = new Set([
				... this.own_deps( pack.slice( this.$.$mol_build2_5slice_web_prod ), dir ),
				... this.own_deps( pack.slice( this.$.$mol_build2_5slice_node_prod ), dir ),
			])
			if( !deps.size ) return []

			const target = dir.resolve( 'package.json' )
			const json = target.exists() ? JSON.parse( target.text() ) : {}
			const dependencies = { ... json.dependencies } as Record< string, string >

			let changed = false
			for( const dep of [ ... deps ].sort() ) {
				if( $node_internal_check( dep ) ) continue
				if( dep === 'internal' ) continue
				if( dependencies[ dep ] ) continue
				dependencies[ dep ] = this.version( dep )
				changed = true
			}
			if( !changed ) return []

			const start = Date.now()
			target.text( JSON.stringify( { ... json, dependencies }, null, '\t' ) + '\n' )
			this.log( target, Date.now() - start )

			return []
		}

	}

}
