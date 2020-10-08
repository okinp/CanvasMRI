Programming task for position of frontend software engineer in Advantis
=======================================================================

The task is to create a web UI for browsing sequences of images of a patient's
brain.


Image sequences
---------------

You will be given 3 sequences of images of a patient's brain which have been
produced by MRI scans. Each sequence depicts a different metric of the brain's
physiology. Some sequences may be grayscale, others will be coloured. For each
sequence of images you will be provided with the url of a png sprite sheet
containing all images of the sequence in order. Each sequence will contain the
same number of images but not necessarily of the same dimensions. Each image of
each sequence will have the same aspect ratio. That means that if you take the
n-th image of each sequence, scale them to the same size and superimpose them
together, the shapes of each image should match.

Here is the information on the 3 image sequences:

- name: T1
  url: https://s3-eu-central-1.amazonaws.com/advantis-public/t1.png

- name: DWI
  url: https://s3-eu-central-1.amazonaws.com/advantis-public/dwi.png

- name: ColorMap
  url: https://s3-eu-central-1.amazonaws.com/advantis-public/colormap.png


Specification
-------------

You need to create a static single page web app for browsing these sequences of
images.

- The app should have a full height panel on the left side. This panel should
  contain 3 vertically stacked elements, one for each sequence of images. Each
  element should display the title of the sequence (provided above) and a
  thumbnail image.  The thumbnail can be obtained by scaling down the middle
  image in the sequence spritesheet. This panel should be collapsible in order
  to free more space for the main panel.

- The rest of the window (right of the left panel) will be the main panel.

- The main panel can contain one or more image viewers.

- An image viewer is an element that allows the user to browse through the
  images of one or more sequences. In the latter case, each sequence's images
  must be superimposed.

  - The image viewer is initially empty.

  - The user can then drag and drop a sequence from the left panel (say
    dragging and dropping the thumbnail) into the image viewer (Dragging and
    dropping from the left panel doesn't remove the sequence item from there).

    - The image viewer should display the middle slice/image of the sequence.

    - The image viewer should contain an index display, showing the number of
      the displayed image.

    - The image viewer should also display somewhere an element with the name
      of the selected sequence. Dragging and dropping that element to the left
      panel should remove the sequence from the image viewer.

  - Scrolling up and down, while the pointer focus is on the image viewer,
    should browse through the images in the corresponding direction. The index
    display should correctly update while browsing/scrolling.

  - The user should then be able to drag and drop more images from the left
    panel into the image viewer.

    - The image viewer should stay on the current displayed index, but now
      display the corresponding images of all selected sequences, superimposed.

    - Scrolling to a different index should display the new corresponding
      images of all selected sequences, superimposed.

    - Just like before, the name of the new sequence must be listed in the
      image viewer so that the user can drag and drop it back to the left panel
      in order to remove it from the image viewer.

- The main panel should somewhere have an element that controls the number and
  layout of image viewers.

  - It should provide the following options:

    - Single image viewer covering the entire main panel area. This is the
      default.

    - Two image viewers, one in the left and the other in the right half of the
      main panel.

    - Three image viewers, one in the left half, one in the top half of the
      right half and the other in the bottom half of the right half of the main
      panel.

    - Four image viewers, one on the top left, one on the bottom left, one on
      the top right, and one on the bottom right.

  - Going from a layout of more image viewers to one with less, should preserve
    the first image viewers and discard the remaining. Going to a layout with
    more image viewers should initialize them as empty.

  - Scrolling/browsing on any of the image viewers should browse (and update
    the index display) of all image viewers.

  - The user should also be able to drag and drop a sequence from an image
    viewer to another, in order to add the sequence there as well, just like he
    would drag and drop from the left panel.


Technical requirements
----------------------

- This should be a static web app. It shouldn't require any server code to run.
  It should contain an `index.html` file that one needs to open locally with
  his browser to use the app.

- If anything other than opening the `index.html` is needed, or any info to
  understand what's going on is necessary, put it in a `README.md` file in the
  top level directory.

- You should only use HTML, CSS and Javascript. Please refrain from using
  things like LESS/Sass and Coffeescript. Keep it simple. Don't even think of
  using Flash.

- You can, and are suggested to, use relatively recent technologies like HTML5
  and CSS3. Supporting older or exotic browsers isn't a priority. Everything
  should however work in decently recent vanilla versions of both
  chrome/chromium and firefox.

- You can use libraries and frameworks but don't overdo it. Should you have 3rd
  party code included in the solution (instead of, say, fetching over a CDN),
  put it in a different directory from your own source code. If you include 3rd
  party code snippets in your own code, clearly state the source
  (eg stackoverflow/github/blog url) in a comment.

- Keep your code clean and as simple as possible. Be consistent with your
  indentation and generally accepted coding style conventions. Use comments
  where necessary.

- Submitted code should be in a private git repo. Try to keep the commit
  history clean.  If hosted in github, add dimrozakis as a collaborator. If in
  bitbucket, then share it to htuttle instead.
