from setuptools import setup

entry_points = """
    [paste.app_factory]
    main = overlord:main
"""

requires = [
    'retools',
    'pyramid==1.3',
    'waitress',
    'pyramid_debugtoolbar'
    ]

setup(name='overlord',
      version='0.0',
      description='Overlord',
      packages=['overlord'],
      install_requires=requires,
      entry_points=entry_points
      )
