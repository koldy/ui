module.exports = {
	name: 'Default Koldy UI Dark Theme',
	description: 'A theme suitable for dark user interfaces',
	license: 'MIT',
	author: [
		{
			name: 'Vlatko',
			email: 'vlatko@koudela.org',
			github: 'https://github.com/vkoudela'
		}
	],
	html: {},
	body: {
		fontSize: '15px',
		background: '#222222',
		color: '#efefef'
	},
	zIndex: 5000,
	mediaQueries: {
		mobile: '(max-width: 787px)',
		tablet: '(min-width: 788px) and (max-width: 991px)',
		desktop: '(min-width: 992px)',
		xs: '(max-width: 499px)',
		sm: '(min-width: 500px) and (max-width: 787px)',
		md: '(min-width: 788px) and (max-width: 991px)',
		lg: '(min-width: 992px) and (max-width: 1199px)',
		xlg: '(min-width: 1200px)'
	},
	themeColor: '#000000',
	color: {
		primary: ['#82b6d4', '#71acce', '#5fa1c8', '#4d97c2', '#3c8dbc', '#3781ab', '#32749a', '#2c6789', '#275a78'],
		info: ['#5cd6f4', '#45d1f3', '#2ecbf1', '#17c5f0', '#00c0ef', '#00afda', '#009ec4', '#008cae', '#007b99'],
		success: ['#5cc696', '#45be87', '#2eb678', '#17ae69', '#00a65a', '#009752', '#00884a', '#007942', '#006a3a'],
		warning: ['#f7c068', '#f6b752', '#f5ae3d', '#f4a527', '#f39c12', '#dd8e11', '#c7800f', '#b1720e', '#9b640c'],
		danger: ['#f89f92', '#f79182', '#f68473', '#f57663', '#f56954', '#df604d', '#c95645', '#b34d3e', '#9c4336'],
		gray: ['#ebedf3', '#e2e4ea', '#dee1e7', '#dadde4', '#d6d9e1', '#d2d6de', '#bfc3ca', '#acb0b6', '#999ca2', '#86898e', '#7e8186'],
		black: ['#636363', '#111111', '#000000'],
		semiBlack: [
			'rgba(0, 0, 0, 0.05)',
			'rgba(0, 0, 0, 0.2)',
			'rgba(0, 0, 0, 0.4)',
			'rgba(0, 0, 0, 0.5)',
			'rgba(0, 0, 0, 0.6)',
			'rgba(0, 0, 0, 0.8)',
			'rgba(0, 0, 0, 0.95)'
		],
		semiWhite: [
			'rgba(255, 255, 255, 0.05)',
			'rgba(255, 255, 255, 0.2)',
			'rgba(255, 255, 255, 0.4)',
			'rgba(255, 255, 255, 0.5)',
			'rgba(255, 255, 255, 0.6)',
			'rgba(255, 255, 255, 0.8)',
			'rgba(255, 255, 255, 0.95)'
		],
    textColor: ['#aaaaaa', '#cccccc', '#dddddd', '#eeeeee', '#efefef', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
    textColorInverse: ['#666666', '#444444', '#333333', '#222222', '#111111', '#000000', '#000000', '#000000', '#000000']
	},
	badge: {
		defaults: {
			variant: 'round',
			color: 'primary',
			size: 'md'
		},
		variant: {
			square: {
				transition: 'all 140ms ease-in-out',
				fontFamily: 'inherit, sans-serif',
				fontWeight: 600,
				borderRadius: 'none',
				'&:disabled': {
					cursor: 'not-allowed'
				}
			},
			rounded: {
				transition: 'all 140ms ease-in-out',
				fontFamily: 'inherit, sans-serif',
				fontWeight: 600,
				borderRadius: '4px',
				'&:disabled': {
					cursor: 'not-allowed'
				}
			},
			round: {
				transition: 'all 140ms ease-in-out',
				fontFamily: 'inherit, sans-serif',
				fontWeight: 600,
				borderRadius: '20vh',
				'&:disabled': {
					cursor: 'not-allowed'
				}
			},
			circle: {
				display: 'inline-block',
				verticalAlign: 'inherit',
				fontWeight: 600,
				borderRadius: '100%'
			}
		},
		color: {
			primary: {
				color: '#ffffff',
				backgroundColor: 'primary',
				borderColor: 'primary'
			},
			info: {
				color: '#ffffff',
				backgroundColor: 'info',
				borderColor: 'info'
			},
			success: {
				color: '#ffffff',
				backgroundColor: 'success',
				borderColor: 'success'
			},
			danger: {
				color: '#ffffff',
				backgroundColor: 'danger',
				borderColor: 'danger'
			},
			warning: {
				color: '#ffffff',
				backgroundColor: 'warning',
				borderColor: 'warning'
			},
			neutral: {
				color: '#222222',
				backgroundColor: 'gray',
				borderColor: 'gray'
			}
		},
		size: {
			sm: {
				fontSize: '0.6em',
				padding: '0.1em 0.3em',
				minWidth: '1.8em'
			},
			md: {
				fontSize: '0.77em',
				padding: '0.2em 0.4em',
				minWidth: '1.95em'
			},
			lg: {
				fontSize: '1em',
				padding: '0.3em 0.5em',
				minWidth: '2.2em'
			}
		}
	},
	button: {
		defaults: {
			variant: 'square',
			width: null,
			color: 'primary',
			size: 'md'
		},
		width: {
			sm: '60px',
			md: '100px',
			lg: '160px',
			xlg: '220px',
			block: '100%'
		},
		variant: {
			square: {
				fontFamily: 'Source Sans Pro, Arial, sans-serif',
				fontWeight: 400,
				transition: 'all 140ms ease-in-out',
				borderRadius: 'none',
				'&:disabled': {
					cursor: 'not-allowed'
				}
			},
			rounded: {
				fontFamily: 'Source Sans Pro, Arial, sans-serif',
				fontWeight: 400,
				transition: 'all 140ms ease-in-out',
				borderRadius: '4px',
				'&:disabled': {
					cursor: 'not-allowed'
				}
			},
			round: {
				fontFamily: 'Source Sans Pro, Arial, sans-serif',
				fontWeight: 400,
				transition: 'all 140ms ease-in-out',
				borderRadius: '100vh',
				'&:disabled': {
					cursor: 'not-allowed'
				}
			},
			circle: {
				fontFamily: 'Source Sans Pro, Arial, sans-serif',
				fontWeight: 400,
				display: 'inline-block',
				verticalAlign: 'middle',
				width: '40px',
				height: '40px',
				borderRadius: '100%'
			}
		},
		color: {
			primary: {
				color: 'textColor|1',
				backgroundColor: 'primary',
				borderColor: 'primary|1',
				'&:hover': {
					backgroundColor: 'primary|1',
					borderColor: 'primary|2',
					boxShadow: 'none'
				},
				'&:disabled': {
					backgroundColor: 'primary|-4',
					borderColor: 'primary|-4'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px primary|-4',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px primary|3'
				}
			},
			info: {
				color: 'textColor',
				backgroundColor: 'info',
				borderColor: 'info|1',
				'&:hover': {
					backgroundColor: 'info|1',
					borderColor: 'info|2',
					boxShadow: 'none'
				},
				'&:disabled': {
					backgroundColor: 'info|-4',
					borderColor: 'info|-4'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px info|-4',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px info|3'
				}
			},
			success: {
				color: 'textColor',
				backgroundColor: 'success',
				borderColor: 'success|1',
				'&:hover': {
					backgroundColor: 'success|1',
					borderColor: 'success|2',
					boxShadow: 'none'
				},
				'&:disabled': {
					backgroundColor: 'success|-4',
					borderColor: 'success|-4'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px success|-4',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px success|3'
				}
			},
			danger: {
				color: 'textColor',
				backgroundColor: 'danger',
				borderColor: 'danger|1',
				'&:hover': {
					backgroundColor: 'danger|1',
					borderColor: 'danger|2',
					boxShadow: 'none'
				},
				'&:disabled': {
					backgroundColor: 'danger|-4',
					borderColor: 'danger|-4'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px danger|-4',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px danger|3'
				}
			},
			warning: {
				color: 'textColor',
				backgroundColor: 'warning',
				borderColor: 'warning|1',
				'&:hover': {
					backgroundColor: 'warning|1',
					borderColor: 'warning|2',
					boxShadow: 'none'
				},
				'&:disabled': {
					backgroundColor: 'warning|-4',
					borderColor: 'warning|-4'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px warning|-4',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px warning|3'
				}
			},
			neutral: {
				color: 'textColorInverse',
				backgroundColor: 'gray',
				borderColor: 'gray|1',
				'&:hover': {
					backgroundColor: 'gray|1',
					borderColor: 'gray|2',
					boxShadow: 'none'
				},
				'&:disabled': {
					backgroundColor: 'gray|-3',
					borderColor: 'gray|-3',
					color: '#888888'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px gray|-3',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px gray|3'
				}
			},
			transparent: {
				color: 'textColor',
				backgroundColor: 'transparent',
				borderColor: '#121212',
				'&:hover': {
					backgroundColor: 'transparent',
					borderColor: '#000000',
					boxShadow: 'none'
				},
				'&:disabled': {
					color: '#666666',
					borderColor: 'transparent'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px gray|-2',
					outline: 'none'
				},
				'&:active': {
					boxShadow: 'inset 0 0 1px 2px gray|2'
				}
			},
			link: {
				color: 'textColor',
				backgroundColor: 'transparent',
				borderColor: 'none',
				textDecoration: 'underline',
				'&:hover': {
					backgroundColor: 'transparent',
					borderColor: 'none',
					boxShadow: 'none'
				},
				'&:disabled': {
					color: 'textColor|-2',
					borderColor: 'transparent'
				},
				'&:focus': {
					boxShadow: '0 0 1px 2px gray|0'
				},
				'&:active': {
					boxShadow: 'none'
				}
			}
		},
		size: {
			sm: {
				fontSize: '0.8rem',
				padding: '0.35em 0.6125em',
				lineHeight: 1.3
			},
			md: {
				fontSize: '0.92rem',
				padding: '0.5em 0.875em',
				lineHeight: 1.3
			},
			lg: {
				fontSize: '1.12rem',
				padding: '0.8em 1.4em',
				lineHeight: 1.3
			}
		}
	},
	overlay: {
		defaults: {
			backgroundColor: 'semiBlack',
			animationDuration: '300ms'
		}
	},
	text: {
		defaults: {
			variant: 'text'
		},
		variant: {
			text: {
				fontSize: '1rem',
				color: 'textColor'
			},
			link: {
				color: 'textColor',
				textDecoration: 'none',
				borderBottom: '1px dashed #777777',
				cursor: 'pointer',
				'&:hover': {
					borderBottomColor: '#999999',
					borderBottomStyle: 'solid'
				}
			}
		}
	},
	table: {
		defaults: {
			size: 'md',
			color: 'transparent',
			border: null,
			hover: null,
			striped: null,
			tableLayout: null
		},
		size: {
			sm: {
				body: {
					th: {
						fontSize: '0.8rem',
						padding: '0.25rem',
						fontWeight: 'normal'
					},
					td: {
						fontSize: '0.8rem',
						padding: '0.25rem'
					}
				}
			},
			md: {
				head: {
					th: {
						fontSize: '0.92rem',
						padding: '0.5rem',
						fontWeight: 'bold'
					},
					td: {
						fontSize: '0.92rem',
						padding: '0.5rem'
					}
				},
				body: {
					th: {
						fontSize: '0.92rem',
						padding: '0.5rem',
						fontWeight: 'bold'
					},
					td: {
						fontSize: '0.92rem',
						padding: '0.5rem'
					}
				},
				foot: {
					th: {
						fontSize: '0.92rem',
						padding: '0.5rem',
						fontWeight: 'bold'
					},
					td: {
						fontSize: '0.92rem',
						padding: '0.5rem'
					}
				}
			},
			lg: {
				body: {
					th: {
						fontSize: '1.1rem',
						padding: '0.75rem',
						fontWeight: 'bold'
					},
					td: {
						fontSize: '1.1rem',
						padding: '0.75rem',
						fontWeight: 'normal'
					}
				}
			}
		},
		color: {
			transparent: {
				borderColor: null,
				head: {
					backgroundColor: 'transparent',
					textColor: 'textColor'
				},
				body: {
					backgroundColor: 'transparent',
					backgroundHoverColor: 'transparent',
					backgroundStripeColor: 'transparent',
					textColor: 'textColor',
					textHoverColor: 'textColor|1'
				}
			},
			gray: {
				borderColor: '#212122',
				head: {
					backgroundColor: '#161622',
					textColor: 'textColor'
				},
				body: {
					backgroundColor: '#161622',
					backgroundHoverColor: '#222222',
					backgroundStripeColor: '#181818',
					textColor: 'textColor',
					textHoverColor: 'textColor|1'
				}
			},
			primary: {
				borderColor: 'primary',
				head: {
					backgroundColor: '#161622',
					textColor: 'textColor'
				},
				body: {
					backgroundColor: 'transparent',
					backgroundHoverColor: 'transparent',
					backgroundStripeColor: 'transparent',
					textColor: 'textColor',
					textHoverColor: 'textColor|1'
				}
			}
		}
	},
	inputField: {
		defaults: {
			size: 'md',
			width: 'md',
			variant: 'square',
			color: 'primary'
		},
		size: {
			sm: {
				// these are the only CSS values we're going to apply
				fontSize: '0.8rem',
				fontWeight: 'normal',
				padding: '0.35em',
				lineHeight: 1.3,
				letterSpacing: 'normal'
			},
			md: {
				// these are the only CSS values we're going to apply
				fontSize: '0.92rem',
				fontWeight: 'normal',
				padding: '0.5em',
				lineHeight: 1.3,
				letterSpacing: 'normal'
			},
			lg: {
				// these are the only CSS values we're going to apply
				fontSize: '1.12rem',
				fontWeight: 'normal',
				padding: '0.8em',
				lineHeight: 1.3,
				letterSpacing: 'normal'
			}
		},
		width: {
			sm: '180px',
			md: '280px',
			lg: '380px'
		},
		variant: {
			square: {
				// these are the only CSS values we're going to apply
				borderRadius: 'none',
				borderWidth: '2px',
				borderStyle: 'solid',
				fontFamily: undefined,
				textAlign: 'left'
			},
			rounded: {
				borderRadius: '4px',
				borderWidth: '2px',
				borderStyle: 'solid',
				fontFamily: undefined
			},
			round: {
				borderRadius: '2rem',
				borderWidth: '2px',
				borderStyle: 'solid',
				fontFamily: undefined
			}
		},
		color: {
			primary: {
				normal: {
					// these are the only CSS values we're going to apply
					background: '#161622',
					backgroundSize: undefined,
					color: 'textColor',
					borderColor: 'gray',
					outline: undefined,
					outlineOffset: undefined,
					hover: {
						backgroundSize: undefined,
						borderColor: 'gray|3'
					},
					focus: {
						boxShadow: '0 0 1px 2px primary|-2',
						outline: 'none',
						borderColor: 'primary|-2'
					}
				},
				disabled: {
					background: '#161622',
					color: 'black|-1',
					borderColor: 'gray|-2',
					hover: {
						background: '#29293c'
					}
				},
				readOnly: {
					background: '#161622',
					backgroundSize: undefined,
					color: 'primary',
					borderColor: 'gray|-2',
					hover: {
						background: '#29293c',
						backgroundSize: undefined,
						color: 'primary|2',
						borderColor: 'gray'
					}
				}
			},
			success: {
				normal: {
					// these are the only CSS values we're going to apply
					background: '#161622',
					backgroundSize: undefined,
					color: 'white',
					borderColor: 'success',
					outline: undefined,
					outlineOffset: undefined,
					hover: {
						backgroundSize: undefined,
						borderColor: 'success|3'
					},
					focus: {
						boxShadow: '0 0 1px 2px success|-2',
						outline: 'none',
						borderColor: 'success|-2'
					}
				},
				disabled: {
					background: '#161622',
					color: 'black|-1',
					borderColor: 'success|-2',
					hover: {
						background: '#29293c'
					}
				},
				readOnly: {
					background: '#29293c',
					backgroundSize: undefined,
					color: 'success',
					borderColor: 'success|-2',
					hover: {
						background: '#29293c',
						backgroundSize: undefined,
						color: 'success|2',
						borderColor: 'gray'
					}
				}
			},
			warning: {
				normal: {
					// these are the only CSS values we're going to apply
					background: '#161622',
					backgroundSize: undefined,
					color: 'white',
					borderColor: 'warning',
					outline: undefined,
					outlineOffset: undefined,
					hover: {
						backgroundSize: undefined,
						borderColor: 'warning|3'
					},
					focus: {
						boxShadow: '0 0 1px 2px warning|-2',
						outline: 'none',
						borderColor: 'warning|-2'
					}
				},
				disabled: {
					background: '#161622',
					color: 'black|-1',
					borderColor: 'warning|-2',
					hover: {
						background: '#29293c'
					}
				},
				readOnly: {
					background: '#29293c',
					backgroundSize: undefined,
					color: 'warning',
					borderColor: 'warning|-2',
					hover: {
						background: '#29293c',
						backgroundSize: undefined,
						color: 'warning|2',
						borderColor: 'gray'
					}
				}
			},
			danger: {
				normal: {
					// these are the only CSS values we're going to apply
					background: '#161622',
					backgroundSize: undefined,
					color: 'white',
					borderColor: 'danger',
					outline: undefined,
					outlineOffset: undefined,
					hover: {
						backgroundSize: undefined,
						borderColor: 'danger|3'
					},
					focus: {
						boxShadow: '0 0 1px 2px danger|-2',
						outline: 'none',
						borderColor: 'danger|-2'
					}
				},
				disabled: {
					background: '#161622',
					color: 'black|-1',
					borderColor: 'danger|-2',
					hover: {
						background: '#29293c'
					}
				},
				readOnly: {
					background: '#29293c',
					backgroundSize: undefined,
					color: 'danger',
					borderColor: 'danger|-2',
					hover: {
						background: '#29293c',
						backgroundSize: undefined,
						color: 'danger|2',
						borderColor: 'gray'
					}
				}
			}
		}
	},
	checkboxAndRadio: {
		defaults: {
			size: 'md',
			color: 'primary',
			variantRadio: 'dot-round',
			variantCheckbox: 'checkmark-square'
		},
		size: {
			sm: 14,
			md: 20,
			lg: 28
		},
		color: {
			primary: {
				inactiveContainerBackground: '#555555',
				inactiveContainerHoverBackground: '#777777',
				activeContainerBackground: 'primary|-1',
				activeContainerHoverBackground: 'primary',
				inactiveMarkerColor: '#ffffff',
				inactiveMarkerHoverColor: '#ffffff',
				activeMarkerColor: '#ffffff',
				activeMarkerHoverColor: '#ffffff'
			},
			info: {
				inactiveContainerBackground: '#555555',
				inactiveContainerHoverBackground: '#777777',
				activeContainerBackground: 'info|-1',
				activeContainerHoverBackground: 'info',
				inactiveMarkerColor: '#ffffff',
				inactiveMarkerHoverColor: '#ffffff',
				activeMarkerColor: '#ffffff',
				activeMarkerHoverColor: '#ffffff'
			},
			success: {
				inactiveContainerBackground: '#555555',
				inactiveContainerHoverBackground: '#777777',
				activeContainerBackground: 'success|-1',
				activeContainerHoverBackground: 'success',
				inactiveMarkerColor: '#ffffff',
				inactiveMarkerHoverColor: '#ffffff',
				activeMarkerColor: '#ffffff',
				activeMarkerHoverColor: '#ffffff'
			},
			danger: {
				inactiveContainerBackground: '#555555',
				inactiveContainerHoverBackground: '#777777',
				activeContainerBackground: 'danger|-1',
				activeContainerHoverBackground: 'danger',
				inactiveMarkerColor: '#ffffff',
				inactiveMarkerHoverColor: '#ffffff',
				activeMarkerColor: '#ffffff',
				activeMarkerHoverColor: '#ffffff'
			},
			warning: {
				inactiveContainerBackground: '#555555',
				inactiveContainerHoverBackground: '#777777',
				activeContainerBackground: 'warning|-1',
				activeContainerHoverBackground: 'warning',
				inactiveMarkerColor: '#ffffff',
				inactiveMarkerHoverColor: '#ffffff',
				activeMarkerColor: '#ffffff',
				activeMarkerHoverColor: '#ffffff'
			},
			neutral: {
				inactiveContainerBackground: '#444444',
				inactiveContainerHoverBackground: '#666666',
				activeContainerBackground: '#999999',
				activeContainerHoverBackground: '#aaaaaa',
				inactiveMarkerColor: '#aaaaaa',
				inactiveMarkerHoverColor: '#ffffff',
				activeMarkerColor: '#ffffff',
				activeMarkerHoverColor: '#ffffff'
			}
		}
	},
	toast: {
		defaults: {
			position: 'top-right'
		},
		'top-left': {},
		'top-center': {},
		'top-right': {},
		'top-stretch': {},
		'bottom-left': {},
		'bottom-center': {},
		'bottom-right': {},
		'bottom-stretch': {}
	},
	drawer: {
		defaults: {
			size: '50%',
			overlayAnimationDuration: '300ms',
			entryAnimationDuration: '300ms',
			exitAnimationDuration: '400ms'
		}
	},
	datePicker: {
		defaults: {
			variant: 'square',
			color: 'primary',
			size: 'md'
		},
		variant: {
			square: {
				dayInMonth: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '0'
				},
				dayOutOfMonth: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '0'
				},
				dayName: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '0'
				}
			},
			rounded: {
				dayInMonth: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '4px'
				},
				dayOutOfMonth: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '4px'
				},
				dayName: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '4px'
				}
			},
			round: {
				dayInMonth: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '100vh'
				},
				dayOutOfMonth: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '100vh'
				},
				dayName: {
					fontFamily: 'Open Sans, sans-serif',
					borderRadius: '100vh'
				}
			}
		},
		color: {
			primary: {
				dayInMonth: {
					background: 'transparent',
					border: '1px solid transparent',
					outline: 'none',
					'&:hover': {
						borderColor: '#cfcfcf'
					},
					color: '#efefef',
					'&.selected': {
						background: '#666666'
					},
					'&:disabled': {
						cursor: 'not-allowed',
						background: '#444444'
					}
				},
				dayOutOfMonth: {
					color: '#666666',
					outline: 'none',
					'&:disabled': {
						cursor: 'not-allowed',
						background: '#333333'
					}
				},
				dayName: {
					color: '#cccccc'
				},
				lineColor: '#666666'
			}
		},
		size: {
			sm: {
				dayInMonth: {
					fontSize: '0.8rem',
					padding: '0.25rem'
				},
				dayOutOfMonth: {
					fontSize: '0.8rem',
					padding: '0.25rem'
				},
				dayName: {
					fontSize: '0.8rem',
					padding: '0.25rem'
				}
			},
			md: {
				dayInMonth: {
					fontSize: '0.92rem',
					padding: '0.5rem'
				},
				dayOutOfMonth: {
					fontSize: '0.92rem',
					padding: '0.5rem'
				},
				dayName: {
					fontSize: '0.92rem',
					padding: '0.5rem'
				}
			},
			lg: {
				dayInMonth: {
					fontSize: '1.12rem',
					padding: '0.75rem'
				},
				dayOutOfMonth: {
					fontSize: '1.12rem',
					padding: '0.75rem'
				},
				dayName: {
					fontSize: '1.12rem',
					padding: '0.75rem'
				}
			}
		}
	},
	menu: {
		defaults: {
			variant: 'square',
			size: 'md',
			color: 'gray'
		},
		variant: {
			square: {
				menu: {},
				item: {
					fontFamily: 'inherit',
					textDecoration: 'none'
				},
				line: {}
			},
			rounded: {
				menu: {},
				item: {
					fontFamily: 'inherit',
					borderRadius: '4px',
					textDecoration: 'none'
				},
				line: {}
			}
		},
		size: {
			sm: {
				menu: {},
				item: {
					fontSize: '0.8rem',
					padding: '0.35em 0.6125em',
					lineHeight: 1.3
				},
				line: {
					margin: '0.3rem 0'
				}
			},
			md: {
				menu: {},
				item: {
					fontSize: '0.92rem',
					padding: '0.5em 0.875em',
					lineHeight: 1.3
				},
				line: {
					margin: '0.5rem 0'
				}
			},
			lg: {
				menu: {},
				item: {
					fontSize: '1.12rem',
					padding: '0.8em 1.4em',
					lineHeight: 1.3
				},
				line: {
					margin: '0.7rem 0'
				}
			}
		},
		color: {
			primary: {
				menu: {
					background: 'transparent',
					outline: 'none'
				},
				item: {
					background: 'primary',
					border: 'none',
					outline: 'none',
					color: '#ffffff',
					'&:hover': {
						background: 'primary|1'
					},
					'&.selected': {
						background: 'primary|3',
						color: '#ffffff',
						':hover': {
							background: 'primary|4'
						}
					},
					'&.disabled': {
						cursor: 'not-allowed',
						background: 'primary|-2'
					}
				},
				line: {
					borderTop: '1px solid #efefef'
				}
			},
			primaryInverted: {
				menu: {
					background: 'transparent',
					outline: 'none'
				},
				item: {
					background: 'transparent',
					border: 'none',
					outline: 'none',
					color: '#efefef',
					'&:hover': {
						background: 'primary|-2',
						color: '#ffffff'
					},
					'&.selected': {
						background: '#ffffff',
						color: 'primary|-1',
						':hover': {
							background: undefined
						}
					},
					'&.disabled': {
						cursor: 'not-allowed'
					}
				},
				line: {
					borderTop: '1px solid #efefef'
				}
			},
			gray: {
				menu: {
					background: 'transparent',
					outline: 'none'
				},
				item: {
					background: 'transparent',
					border: 'none',
					outline: 'none',
					color: 'white',
					'&:hover': {
						background: '#333333'
					},
					'&.selected': {
						background: '#444444',
						':hover': {
							background: '#454545'
						}
					},
					'&.disabled': {
						cursor: 'not-allowed',
						background: '#343434'
					}
				},
				line: {
					borderTop: '1px solid #444444'
				}
			}
		}
	},
	progressBar: {
		defaults: {
			color: 'primary',
			size: 'md',
			variant: 'rounded'
		},
		color: {
			primary: {
				inactiveBackgroundColor: 'black',
				activeBackgroundColor: 'primary'
			},
			info: {
				inactiveBackgroundColor: 'black',
				activeBackgroundColor: 'info'
			},
			success: {
				inactiveBackgroundColor: 'black',
				activeBackgroundColor: 'success'
			},
			warning: {
				inactiveBackgroundColor: 'black',
				activeBackgroundColor: 'warning'
			},
			danger: {
				inactiveBackgroundColor: 'black',
				activeBackgroundColor: 'danger'
			}
		},
		size: {
			sm: {
				height: 4,
				padding: 0
			},
			md: {
				height: 8,
				padding: 1
			},
			lg: {
				height: 18,
				padding: 4
			}
		},
		variant: {
			square: 0,
			rounded: 4,
			round: 100
		}
	}
};
